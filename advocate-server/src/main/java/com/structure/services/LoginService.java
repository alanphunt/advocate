package com.structure.services;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.structure.models.AccountDetails;
import com.structure.models.DTO.LoginDTO;
import com.structure.utilities.AccountDetailsRequestBean;
import com.structure.utilities.Constants;

import com.structure.utilities.Utils;
import com.structure.utilities.constants.Error;
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
  private AccountDetailsService accountService;
  @Autowired
  private Utils utilService;

  public ResponseEntity<?> handleTeacherRehydration(){
    try {
      return ResponseEntity.ok(utilService.mapTeacherToTeacherDTO(
          accountService.refreshAccountDetailsWithUsername(detailsBean.getAccountDetails().getUsername())
      ));
    } catch (Exception npe) {
      System.out.println(npe.getMessage());
      Map<String, String> errors = new HashMap<>();
      errors.put("error", Error.AUTH_FAILED);
      return ResponseEntity.status(Constants.HTTP_UNAUTHORIZED).body(errors);
    }
  }

  public ResponseEntity<?> handleLogin(LoginDTO authRequest, HttpServletResponse resp){
    Authentication auth = null;
    try {
      auth = authMan.authenticate(
          new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
    } catch (Exception e) {
      Map<String, String> errors = new HashMap<>();
      errors.put("login", "Username or password is incorrect.");
      return ResponseEntity.badRequest().body(errors);
    }
    AccountDetails details = (AccountDetails) auth.getPrincipal();
    jwtUtil.createAndAddJwtToCookie(jwtUtil.generateToken(details.getUsername()), resp);
    return ResponseEntity.ok(utilService.mapTeacherToTeacherDTO(details));
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


}
