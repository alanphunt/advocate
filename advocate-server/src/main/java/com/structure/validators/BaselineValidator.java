package com.structure.validators;

import com.structure.constraints.BaselineConstraint;
import com.structure.models.Baseline;
import com.structure.utilities.constants.Error;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class BaselineValidator implements ConstraintValidator<BaselineConstraint, Baseline> {

    @Override
    public boolean isValid(Baseline baseline, ConstraintValidatorContext constraintValidatorContext) {
        boolean flag = true;
        if(baseline.getLabel().isBlank()){
            constraintValidatorContext.buildConstraintViolationWithTemplate("label:"+ Error.EMPTY_FIELD).addConstraintViolation();
            flag = false;
        }
        flag = ValidatorUtils.validateDate(baseline.getDateStarted(), constraintValidatorContext).isEmpty() && flag;
        flag = ValidatorUtils.validateTrackingMeta(baseline.getBaselineTemplate(), baseline.getTracking(), constraintValidatorContext).isEmpty() && flag;
        return flag;
    }
}
