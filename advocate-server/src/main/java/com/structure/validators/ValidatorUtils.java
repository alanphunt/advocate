package com.structure.validators;

import com.structure.models.Tracking;
import com.structure.models.TrackingMeta;
import com.structure.utilities.constants.Error;
import com.structure.utilities.constants.TrialTemplate;

import javax.validation.ConstraintValidatorContext;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

public class ValidatorUtils {

    public static  Optional<Boolean> validateDate(Date date, ConstraintValidatorContext constraintValidatorContext){
        Optional<Boolean> flag = Optional.empty();
        try {
            if(date.getTime() == -1)
                throw new Exception(Error.INVALID_DATE);
            else if(date.getTime() == 0)
                throw new Exception(Error.EMPTY_FIELD);
        } catch (Exception npe) {
            String mapString = "dateStarted:" + npe.getMessage();
            constraintValidatorContext.buildConstraintViolationWithTemplate(mapString).addConstraintViolation();
            flag = Optional.of(false);
        }
        return flag;
    }

    public static Optional<Boolean> validateTrackingMeta(String template, Tracking tracking, ConstraintValidatorContext constraintValidatorContext) {
        Optional<Boolean> flag = Optional.empty();
        if (template.equals(TrialTemplate.SCORE_BASIC)) {
            ArrayList<TrackingMeta> tm = (ArrayList<TrackingMeta>) tracking.getTrackingMeta();
            if (tm.size() == 0) {
                constraintValidatorContext.buildConstraintViolationWithTemplate("tracking:" + Error.EMPTY_TRACKINGMETA).addConstraintViolation();
                flag = Optional.of(false);
            } else
                for (TrackingMeta t : tm) {
                    if (t.getLabel().isBlank()) {
                        constraintValidatorContext.buildConstraintViolationWithTemplate("tracking:" + Error.EMPTY_TRACKINGMETA_LABEL).addConstraintViolation();
                        flag = Optional.of(false);
                    }
                }
        } else if (template.equals(TrialTemplate.SCORE_BEST_OUT_OF)) {
            try {
                if (tracking.getBest() < 0 || tracking.getOutOf() < 0)
                    throw new Exception(Error.POSITIVE_NUMBERS_REQUIRED);
                if (tracking.getBest() > tracking.getOutOf())
                    throw new Exception(Error.NUMERATOR_LESS_THAN_DENOMINATOR);
                if(tracking.getOutOf() == 0)
                    throw new Exception(Error.NUMERATOR_IS_ZERO);
                NumberFormat nf = new DecimalFormat("0.0");
                tracking.setAccuracyPercentage(Double.parseDouble(nf.format((double) tracking.getBest() / tracking.getOutOf() * 100)));
            } catch (Exception e) {
                constraintValidatorContext.buildConstraintViolationWithTemplate("tracking:" + e.getMessage()).addConstraintViolation();
                flag = Optional.of(false);
            }
        }
            return flag;
    }

    public static void addMapToConstraint(ConstraintValidatorContext constraintValidatorContext, String map){
        constraintValidatorContext.disableDefaultConstraintViolation();
        constraintValidatorContext
                .buildConstraintViolationWithTemplate(map)
                .addConstraintViolation();
    }
}
