package com.structure.services;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.structure.models.DTOs.AuthRequest;
import com.structure.models.Teacher;
import com.structure.utilities.AccountDetailsRequestBean;
import com.structure.utilities.Constants;

import com.structure.utilities.Utils;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private JWTService jwtUtil;
    @Autowired
    private AuthenticationManager authMan;
    @Autowired
    private AccountDetailsRequestBean detailsBean;
    @Autowired
    private TeacherService teacherService;
    @Autowired
    private Utils utilService;

    public ResponseEntity<?> handleTeacherRehydration(){
        try {
            return ResponseEntity.ok(utilService.mapTeacherToTeacherDTO(teacherService.findTeacherByUsername(detailsBean.getAccountDetails().getUsername())));
        } catch (Exception npe) {
            System.out.println(npe.getMessage());
            Map<String, String> errors = new HashMap<>();
            errors.put("error", Constants.SERVER_ERROR);
            return ResponseEntity.status(Constants.HTTP_UNAUTHORIZED).body(errors);
        }
    }

    public ResponseEntity<?> handleLogin(AuthRequest authRequest, HttpServletResponse resp){
      System.out.println("Handling login request..");
      Authentication auth = null;
      try {
          auth = authMan.authenticate(
                  new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
      } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.badRequest().body(determineLoginErrors());
      }
        // AccountDetails details = (AccountDetails) auth.getPrincipal();
      Teacher teacher = teacherService.findTeacherByUsername(auth.getName());
      jwtUtil.createAndAddJwtToCookie(jwtUtil.generateToken(auth.getName()), resp);
      return ResponseEntity.ok(utilService.mapTeacherToTeacherDTO(teacher));
    }

  public void handleLogout(HttpServletRequest req, HttpServletResponse res){
    try {
      Cookie jwtCookie = jwtUtil.extractJwtFromCookie(req).orElseThrow();
      jwtCookie.setMaxAge(0);
      res.addCookie(jwtCookie);
    } catch (NoSuchElementException e) {
      System.out.println(e.getMessage());
    }
  }

    private Map<String, String> determineLoginErrors() {
        Map<String, String> errors = new HashMap<>();
        errors.put("login", "Username or password is incorrect.");
        return errors;
    }


}
