package com.structure.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.*;

@RestControllerAdvice
public class ErrorController {

    @ExceptionHandler(value = {MethodArgumentNotValidException.class})
    protected final ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex){
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            if(!error.getDefaultMessage().isBlank()){
                String[] mapping = Objects.requireNonNull(error.getDefaultMessage()).split(":");
                errors.put(mapping[0], mapping[1]);
            }
        });
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

}
