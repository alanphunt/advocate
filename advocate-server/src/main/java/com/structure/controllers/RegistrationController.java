package com.structure.controllers;

import com.structure.models.DTO.CreateUserDTO;
import com.structure.utilities.Constants;
import com.structure.services.RegistrationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequestMapping(path=Constants.API_PATH, method = {RequestMethod.POST})
@Validated
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @PostMapping(value = "/createuser")
    public ResponseEntity<?> createUser(@Valid @RequestBody CreateUserDTO user, HttpServletResponse response){
        return registrationService.handleRegistration(user, response);
    }

}
