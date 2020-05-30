package com.structure.controllers;

import com.structure.models.AuthRequest;
import com.structure.models.Teacher;
import com.structure.utilities.JWTUtil;
import com.structure.utilities.TeacherDetailsService;
import com.structure.utilities.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})
public class LoginRegistration {
    private Teacher teacher;

    @Autowired
    private TeacherDetailsService tds;

    @Autowired
    private AuthenticationManager authMan;

    @Autowired
    private JWTUtil jwtUtil;

    private final PasswordEncoder pe = new BCryptPasswordEncoder();

    @PostMapping(value = "/api/createuser")
    public ResponseEntity<?> createUser(@RequestParam Map<String, String> body, HttpServletResponse response, HttpServletRequest req){
        if(Utils.acceptableInput(body.values().toArray(new String[0])))
            return new ResponseEntity<>("Invalid input.", HttpStatus.NOT_ACCEPTABLE);
        System.out.println(body.get("password"));
        teacher = Utils.gson().fromJson(body.toString(), Teacher.class);
        System.out.println(teacher.getPassword());

        teacher.setEnabled(1);
        teacher.setDateCreated(new Date());
        teacher.setPassword(pe.encode(teacher.getPassword()));
        teacher.setId(Utils.generateUniqueId());
        teacher.setClassrooms(new ArrayList<>());
        tds.saveTeacher(teacher);

        String jsonTeacher = Utils.gson().toJson(teacher);
        response.setHeader("Location", "/dashboard");
        return new ResponseEntity<>(jsonTeacher, HttpStatus.ACCEPTED);
    }

    @GetMapping(value = "/api/teacher")
    public ResponseEntity<?> getTeacher(HttpServletRequest request){
        String jwt = request.getHeader("Authorization").substring(7);
        System.out.println("retrieving teacher..");
        try{
           return ResponseEntity.ok(Utils.gson().toJson(tds.loadUserByUsername(jwtUtil.extractEmail(jwt))));
        }catch(NullPointerException npe){
            return ResponseEntity.ok(Utils.gson().toJson(null));
        }
    }

    @PostMapping(value = "/api/authenticate")
    public ResponseEntity<?> createAuthToken(@RequestBody AuthRequest authRequest, HttpServletResponse resp) {
        try {
            authMan.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        }catch(Exception e){
            return ResponseEntity.badRequest().body("Username or password is incorrect");
        }
        teacher = (Teacher) tds.loadUserByUsername(authRequest.getUsername());
        final String jwt = jwtUtil.generateToken(teacher);
        System.out.println(jwt);
        System.out.println(teacher.toString());
        resp.addHeader("authorization", jwt);
        return ResponseEntity.ok(Utils.gson().toJson(teacher));
    }

}
