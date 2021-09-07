package com.structure.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.structure.models.AccountDetails;
import com.structure.models.Authorities;
import com.structure.models.DTOs.RegistrationRequestDTO;
import com.structure.models.Teacher;
import com.structure.utilities.Constants;
import com.structure.utilities.Utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {
    @Autowired private PasswordEncoder pe;
    @Autowired private TeacherService teacherService;
    @Autowired private JWTService jwtService;
    @Autowired private Utils utils;
    @Autowired private AccountDetailsService ads;

    public ResponseEntity<?> handleRegistration(RegistrationRequestDTO body, HttpServletResponse response, HttpServletRequest req){
        Map<String, String> errors = determineRegistrationError(body);
        if(errors.size() == 0) {
            String username = body.getUsername();
            ArrayList<Authorities> auths = new ArrayList<>();
            auths.add(new Authorities(utils.generateUniqueId(), username, Constants.ROLE_USER));
            String teacherId = utils.generateUniqueId();
            AccountDetails accountDetails = new AccountDetails(username, pe.encode(body.getPassword()), teacherId, auths);
            Teacher teacher = new Teacher(teacherId, body.getFirstName(), body.getLastName(), username);
            teacher.setClassrooms(new ArrayList<>());
            ads.saveAccountDetails(accountDetails);
            //teacher.setAccountDetails(accountDetails);
            teacherService.saveTeacher(teacher);
            jwtService.createAndAddJwtToCookie(jwtService.generateToken(username), response);
            return ResponseEntity.ok(utils.mapTeacherToTeacherDTO(teacher));
        }
        return ResponseEntity.status(Constants.HTTP_BAD_REQUEST).body(utils.gson().toJson(errors));

    }

    private Map<String, String> determineRegistrationError(RegistrationRequestDTO body){
        Map<String, String> errors = new HashMap<>();
        if(!body.getPassword().matches(Constants.PASSWORD_REGEX))
            errors.put("password", Constants.INSECURE_PASSWORD_RESPONSE);
        if(!body.getUsername().matches(Constants.EMAIL_REGEX))
            errors.put("username", Constants.INVALID_EMAIL_RESPONSE);
        if(body.getFirstName().isBlank())
            errors.put("firstName", Constants.EMPTY_FIELD_RESPONSE);
        if(body.getLastName().isBlank())
            errors.put("lastName", Constants.EMPTY_FIELD_RESPONSE);
        return errors;
    }
}
