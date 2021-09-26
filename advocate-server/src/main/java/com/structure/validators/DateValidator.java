package com.structure.validators;

import com.structure.constraints.DateConstraint;
import com.structure.utilities.constants.Error;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Date;

public class DateValidator implements ConstraintValidator<DateConstraint, Date> {

    String key;
    boolean allowNull;

    @Override
    public void initialize(DateConstraint annotation) {
        key = annotation.key();
        allowNull = annotation.allowNull();
    }

    @Override
    public boolean isValid(Date value, ConstraintValidatorContext constraintValidatorContext) {
        try {
            if(value.getTime() == -1)
                throw new Exception(Error.INVALID_DATE);
            else if(value.getTime() == 0 && !allowNull)
                throw new Exception(Error.EMPTY_FIELD);
        } catch (Exception npe) {
            String mapString = key + ":" + npe.getMessage();
            ValidatorUtils.addMapToConstraint(constraintValidatorContext, mapString);
            return false;
        }
        return true;
    }
}