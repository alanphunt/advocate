package com.structure.controllers;

import com.structure.models.DTOs.RegistrationRequestDTO;
import com.structure.utilities.Constants;
import com.structure.services.RegistrationService;

import com.structure.utilities.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@RequestMapping(path=Constants.API_PATH, method = {RequestMethod.POST})
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;
    @Autowired
    private Utils utils;

    @PostMapping(value = "/createuser")
    public ResponseEntity<?> createUser(@RequestBody RegistrationRequestDTO body, HttpServletResponse response, HttpServletRequest request){
        return registrationService.handleRegistration(body, response, request);
    }

    @GetMapping(value = "/key")
    public String generateKey(){
        return utils.generateUniqueId();
    }

}
