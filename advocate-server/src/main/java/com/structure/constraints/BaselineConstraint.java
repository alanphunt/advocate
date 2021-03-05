package com.structure.constraints;

import com.structure.validators.BaselineValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = {BaselineValidator.class})
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface BaselineConstraint {
    String message() default "";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
