package com.structure.controllers;

import com.structure.models.Teacher;
import com.structure.repositories.TeacherRepo;
import com.structure.utilities.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})
public class LoginRegistration {
    private Teacher teacher;
    @Autowired
    TeacherRepo tr;
    @Autowired
    PasswordEncoder pe;

    @PostMapping(value = "/api/createuser")
    public ResponseEntity<?> createUser(@RequestParam Map<String, String> body, HttpServletRequest request, HttpServletResponse response){
        if(!Utils.hasAcceptableInput(body.values().toArray(new String[0])))
            return new ResponseEntity<>("Invalid input.", HttpStatus.NOT_ACCEPTABLE);
        teacher = Utils.gson().fromJson(body.toString(), Teacher.class);
        teacher.setPassword(pe.encode(teacher.getPassword()));
        tr.save(teacher);
        String jsonTeacher = Utils.gson().toJson(teacher);
        response.addCookie(Utils.setSession(request, teacher));
        response.setHeader("Location", "/dashboard");
        return new ResponseEntity<>(jsonTeacher, HttpStatus.ACCEPTED);
    }

    @PostMapping(value = "/api/login")
    public ResponseEntity<?> login(@RequestParam Map<String, String> body, HttpServletRequest request, HttpServletResponse response){
        String email = body.get("email");
        String password = body.get("password");
        boolean validPW;

        if(!Utils.hasAcceptableInput(new String[]{email, password}))
            return new ResponseEntity <>("Invalid input.", HttpStatus.NOT_ACCEPTABLE);

        try{
            teacher = tr.findTeacherByEmailAndEnabled(email,1);
            validPW = pe.matches(password, teacher.getPassword());
            if(!Utils.isEmpty(teacher) && validPW){
                String jsonTeacher = Utils.gson().toJson(teacher);
                response.setHeader("Location", "/dashboard");
                response.addCookie(Utils.setSession(request, teacher));
                Utils.getSessionUser(request);
                return new ResponseEntity<>(jsonTeacher, HttpStatus.ACCEPTED);
            }
        }catch(Exception e){
            System.out.println("Login exception: " + e);
        }

        return ResponseEntity
                .status(HttpStatus.NOT_ACCEPTABLE)
                .body("Username or password does not match.");
    }

    @GetMapping(value = "/api/logout")
    public void logout(HttpServletRequest request)throws NullPointerException{
        try {
            System.out.println("Logging out: " + request.getSession().getAttribute("teacher"));
            Utils.invalidateSession(request);
        }catch(NullPointerException npe){
            System.out.println(npe);
        }
    }

}
