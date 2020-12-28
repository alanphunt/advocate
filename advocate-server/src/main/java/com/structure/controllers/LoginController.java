package com.structure.controllers;

import com.structure.models.AuthRequest;
import com.structure.models.Teacher;
import com.structure.services.JWTService;
import com.structure.services.TeacherDetailsService;
import com.structure.utilities.Utils;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.*;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;


@RestController
@RequestMapping(path="/api", method = {RequestMethod.GET, RequestMethod.POST})
public class LoginController {

    @Autowired private TeacherDetailsService TDS;
    @Autowired private JWTService JWT_UTIL;
    @Autowired AuthenticationManager authMan;

    @GetMapping(value = "/teacher")
    public ResponseEntity<?> getTeacher(HttpServletRequest request){
        System.out.println("retrieving teacher..");
        try{
            final String JWT = Utils.extractJwtFromCookie(request).orElseThrow().getValue();
            String teacher = Utils.gson().toJson(TDS.loadUserByUsername(JWT_UTIL.extractEmail(JWT)));
            return ResponseEntity.ok(teacher);
        }catch(Exception npe){
            return ResponseEntity.ok(Utils.gson().toJson("{'sorry':'about that!'}"));
        }
    }

    @PostMapping(value = "/authenticate")
    public ResponseEntity<?> createAuthToken(@RequestBody AuthRequest authRequest, HttpServletResponse resp) {
        try {
            authMan.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(Utils.gson().toJson(determineLoginErrors(authRequest)));
        }
        Teacher teacher = (Teacher) TDS.loadUserByUsername(authRequest.getUsername());
        final String JWT = JWT_UTIL.generateToken(teacher);
        System.out.println(JWT);
        System.out.println(teacher.toString());
        Utils.createAndAddJwtToCookie(JWT, resp);
        return ResponseEntity.ok(Utils.gson().toJson(teacher));
    }

    @GetMapping(value = "/testing")
    public @ResponseBody String testing(@RequestParam String username) throws SQLException {
        //getMySqlDataSource(username);
        return Utils.gson().toJson("");
    }

    @GetMapping(value = "/logout")
    public void logout(HttpServletRequest req, HttpServletResponse res){
        try{
            Cookie jwtCookie = Utils.extractJwtFromCookie(req).orElseThrow();
            jwtCookie.setMaxAge(0);
            res.addCookie(jwtCookie);
        }catch(NoSuchElementException e){
            System.out.println(e.getMessage());
        }
    }


    @PostMapping(value = "/savecomment")
    public ResponseEntity<?> saveComment(HttpServletRequest request, @RequestBody Map<String, String> body){
        final String JWT = Utils.extractJwtFromCookie(request).orElseThrow().getValue();
        Teacher teacher = (Teacher)TDS.loadUserByUsername(JWT_UTIL.extractEmail(JWT));
        teacher.setDescription(body.get("trialComment"));
        TDS.saveTeacher(teacher);
  
        return getTeacher(request);
    }


    private Map<String, String> determineLoginErrors(AuthRequest auth){
        Map<String, String> errors = new HashMap<>();
        errors.put("error", "Username or password is incorrect.");

        /*for(String key : body.keySet()){
            if(key.equals("password") && !body.get(key).matches(Constants.PASSWORD_REGEX))
                errors.put(key, Constants.INSECURE_PASSWORD_RESPONSE);
            else if(!body.get(key).matches(Constants.EMAIL_REGEX))
                errors.put(key, Constants.INVALID_EMAIL_RESPONSE);
        }*/

        return errors;
    }

/* just for future reference when I need to create custom queries
    private void getMySqlDataSource(String username) throws SQLException {
        final String PW = env.getProperty("spring.datasource.password");
        final String UN = env.getProperty("spring.datasource.username");
        final String URL = env.getProperty("spring.datasource.url");
        Connection con;
        PreparedStatement qry;
        con = DriverManager.getConnection(Objects.requireNonNull(URL), UN, PW);

*/
/*        String sql = "SELECT * FROM teachers tch " +
                "JOIN classrooms cls " +
                "JOIN students stu " +
                "JOIN goals gol " +
                "JOIN benchmarks bm " +
                "JOIN trials tri " +
                "JOIN trackings tra " +
                "WHERE tch.username = ? " +
                "AND tch.enabled = 1 " +
                "AND cls.enabled = 1 " +
                "AND stu.enabled = 1 " +
                "AND gol.enabled = 1 " +
                "AND bm.enabled = 1 " +
                "AND tri.enabled = 1 " +
                "AND tra.enabled = 1";*/
    /*

        String sql = "SELECT * FROM teachers t  JOIN classrooms c ON t.id = c.teacher_id"+
                " WHERE t.username = ? AND t.enabled = 1";
        qry = con.prepareStatement(sql);
        qry.setString(1, username);
        ResultSet rs = qry.executeQuery();
        ResultSetMetaData rsmd = rs.getMetaData();
        while(rs.next()){
            for (int i = 1; i <= rsmd.getColumnCount(); i++) {
                if (i > 1) System.out.print(",  ");
                String columnValue = rs.getString(i);
                System.out.print(rsmd.getColumnName(i) + ": " + columnValue);
            }
        }

        rs.close();
        qry.close();
        con.close();
    }
*/
}
