package com.structure.constraints;

import com.structure.validators.TrialValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = {TrialValidator.class})
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface TrialConstraint {
    String message() default "";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
