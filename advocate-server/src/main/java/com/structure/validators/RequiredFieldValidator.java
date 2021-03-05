package com.structure.validators;

import com.structure.constraints.RequiredFieldConstraint;
import com.structure.utilities.constants.Error;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class RequiredFieldValidator implements ConstraintValidator<RequiredFieldConstraint, String> {
    String key, message;

    @Override
    public void initialize(RequiredFieldConstraint annotation){
        key = annotation.key();
        message = (annotation.message().isBlank() ? Error.EMPTY_FIELD : annotation.message());
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if(value.isBlank()){
            String mapString = key + ":" + message;
            ValidatorUtils.addMapToConstraint(constraintValidatorContext, mapString);
            return false;
        }
        return true;
    }

}
