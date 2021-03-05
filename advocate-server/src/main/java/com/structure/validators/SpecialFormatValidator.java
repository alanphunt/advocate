package com.structure.validators;

import com.structure.constraints.SpecialFormatConstraint;
import com.structure.utilities.constants.Error;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class SpecialFormatValidator implements ConstraintValidator<SpecialFormatConstraint, String> {
    String key, format, message;

    @Override
    public void initialize(SpecialFormatConstraint annotation) {
        format = annotation.format();
        key = annotation.key();
        message = annotation.message();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if(value.matches(format))
            return true;
        String mapString = key+":"+(value.isBlank() ? Error.EMPTY_FIELD : message);
        ValidatorUtils.addMapToConstraint(constraintValidatorContext, mapString);
        return false;
    }
}