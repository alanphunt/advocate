package com.structure.controllers;

import com.structure.models.Teacher;
import com.structure.utilities.Constants;
import com.structure.services.JWTService;
import com.structure.services.TeacherDetailsService;
import com.structure.utilities.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(path=Constants.API_PATH, method = {RequestMethod.POST})
public class RegistrationController {

    @Autowired
    private PasswordEncoder pe;
    @Autowired
    private TeacherDetailsService TDS;
    @Autowired
    private JWTService jwtService;

    @PostMapping(value = "/createuser")
    public ResponseEntity<?> createUser(@RequestBody Map<String, String> body, HttpServletResponse response, HttpServletRequest req){
        Map<String, String> errors = determineRegistrationError(body);
        if(errors.size() == 0) {
            Teacher teacher = new Teacher(body.get("firstName"), body.get("lastName"), body.get("username"), Utils.generateUniqueId());
            teacher.setPassword(pe.encode(body.get("password")));
            teacher.setClassrooms(new ArrayList<>());
            TDS.saveTeacher(teacher);
            String jsonTeacher = Utils.gson().toJson(teacher);
            final String JWT = jwtService.generateToken(teacher);
            jwtService.createAndAddJwtToCookie(JWT, response);
            return new ResponseEntity<>(jsonTeacher, HttpStatus.ACCEPTED);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Utils.gson().toJson(errors));
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
