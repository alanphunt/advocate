package com.structure.validators;

import com.structure.constraints.OneOrMoreConstraint;
import com.structure.utilities.constants.Error;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.List;

public class OneOrMoreValidator implements ConstraintValidator<OneOrMoreConstraint, List<?>> {
    String key, message;

    @Override
    public void initialize(OneOrMoreConstraint constraintAnnotation) {
        key = constraintAnnotation.key();
        message = constraintAnnotation.message().isBlank() ? Error.EMPTY_LIST : constraintAnnotation.message();
    }

    @Override
    public boolean isValid(List<?> objects, ConstraintValidatorContext constraintValidatorContext) {
        if(objects.size() == 0){
            ValidatorUtils.addMapToConstraint(constraintValidatorContext, key+":"+message);
            return false;
        }
        return true;
    }
}
