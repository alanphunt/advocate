package com.structure.services;

import java.util.ArrayList;
import java.util.Collections;

import javax.servlet.http.HttpServletResponse;

import com.structure.models.AccountDetails;
import com.structure.models.Authorities;
import com.structure.models.DTO.CreateUserDTO;
import com.structure.models.Teacher;
import com.structure.utilities.Utils;

import com.structure.utilities.constants.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {
    @Autowired private PasswordEncoder pe;
    @Autowired private JWTService jwtService;
    @Autowired private Utils utils;
    @Autowired private AccountDetailsService ads;

    public ResponseEntity<?> handleRegistration(CreateUserDTO userDetails, HttpServletResponse response){
        String username = userDetails.getUsername();
        String teacherId = utils.generateUniqueId();
        ArrayList<Authorities> auths = new ArrayList<>();
        auths.add(new Authorities(utils.generateUniqueId(), username, Role.USER));
        AccountDetails accountDetails = new AccountDetails(username, pe.encode(userDetails.getPassword()), auths, teacherId);
        Teacher teacher = new Teacher(teacherId, userDetails.getFirstName(), userDetails.getLastName());
//        teacher.setClassrooms(new ArrayList<>());
//        accountDetails.setTeacher(Collections.singletonList(teacher));
        accountDetails.setTeacher(teacher);
        ads.saveAccountDetails(accountDetails);
        jwtService.createAndAddJwtToCookie(jwtService.generateToken(username), response);
        return ResponseEntity.ok(utils.mapTeacherToTeacherDTO(accountDetails));
    }

}
