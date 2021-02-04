package com.structure.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.structure.models.AccountDetails;
import com.structure.models.Authorities;
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
    
    public ResponseEntity<?> handleRegistration(Map<String, String> body, HttpServletResponse response, HttpServletRequest req){
        Map<String, String> errors = determineRegistrationError(body);
        if(errors.size() == 0) {
            String username = body.get("username");
            String accountDetailsId = utils.generateUniqueId();
            ArrayList<Authorities> auths = new ArrayList<Authorities>();
            auths.add(new Authorities(utils.generateUniqueId(), Constants.ROLE_USER, accountDetailsId));
            String teacherId = utils.generateUniqueId();
            AccountDetails accountDetails = new AccountDetails(username, pe.encode(body.get("password")), teacherId, auths);
            Teacher teacher = new Teacher(teacherId, body.get( "firstName"), body.get("lastName"), username);
            teacher.setClassrooms(new ArrayList<>());
            ads.saveAccountDetails(accountDetails);
            //teacher.setAccountDetails(accountDetails);
            teacherService.saveTeacher(teacher);
            jwtService.createAndAddJwtToCookie(jwtService.generateToken(username), response);
            return ResponseEntity.ok(utils.mapTeacherToTeacherDTO(teacher));
        }
        return ResponseEntity.status(Constants.HTTP_BAD_REQUEST).body(utils.gson().toJson(errors));

    }

    private Map<String, String> determineRegistrationError(Map<String, String> body){
        Map<String, String> errors = new HashMap<>();
        String val;
        for(String key : body.keySet()){
            val = body.get(key);
            if(key.equals("password") && !val.matches(Constants.PASSWORD_REGEX))
                errors.put(key, Constants.INSECURE_PASSWORD_RESPONSE);
            else if(key.equals("username") && !val.matches(Constants.EMAIL_REGEX))
                errors.put(key, Constants.INVALID_EMAIL_RESPONSE);
            else if(val.isBlank())
                errors.put(key, Constants.EMPTY_FIELD_RESPONSE);
        }
        return errors;
    }
}
