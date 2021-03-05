package com.structure.validators;

import com.structure.constraints.TrialConstraint;
import com.structure.models.Trial;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class TrialValidator implements ConstraintValidator<TrialConstraint, Trial> {


    @Override
    public boolean isValid(Trial trial, ConstraintValidatorContext constraintValidatorContext) {
        boolean flag = true;
        constraintValidatorContext.disableDefaultConstraintViolation();
        System.out.println("validating trial..");
        flag = ValidatorUtils.validateDate(trial.getDateStarted(), constraintValidatorContext).isEmpty() && flag;
        flag = ValidatorUtils.validateTrackingMeta(trial.getTrialTemplate(), trial.getTracking(), constraintValidatorContext).isEmpty() && flag;

        return flag;
    }
}
