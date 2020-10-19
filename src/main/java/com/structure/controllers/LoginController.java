package com.structure.controllers;

import com.structure.models.AuthRequest;
import com.structure.models.Teacher;
import com.structure.utilities.JWTUtil;
import com.structure.utilities.TeacherDetailsService;
import com.structure.utilities.Utils;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.*;


@RestController
@RequestMapping(path="/api", method = {RequestMethod.GET, RequestMethod.POST})
public class LoginRegistration {
    private Teacher teacher;
    @Autowired
    private TeacherDetailsService tds;
    @Autowired
    private AuthenticationManager authMan;
    @Autowired
    private JWTUtil jwtUtil;

    @GetMapping(value = "/teacher")
    public ResponseEntity<?> getTeacher(HttpServletRequest request){

        final String JWT = request.getHeader("Authorization").substring(7);
        System.out.println("retrieving teacher..");
        try{
            //final String JWT = extractJwtFromCookie(request);
            String teacher = Utils.gson().toJson(tds.loadUserByUsername(jwtUtil.extractEmail(JWT)));
            return ResponseEntity.ok(teacher);
        }catch(Exception npe){
            return ResponseEntity.ok(Utils.gson().toJson(null));
        }
    }

    @PostMapping(value = "/authenticate")
    public ResponseEntity<?> createAuthToken(@RequestBody AuthRequest authRequest, HttpServletResponse resp) {
        try {
            authMan.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        }catch(Exception e){
            return ResponseEntity.badRequest().body("Username or password is incorrect");
        }


        teacher = (Teacher) tds.loadUserByUsername(authRequest.getUsername());
        final String JWT = jwtUtil.generateToken(teacher);
        System.out.println(JWT);
        System.out.println(teacher.toString());

        resp.addHeader("jwt", JWT);
        return ResponseEntity.ok(Utils.gson().toJson(teacher));
    }

    @GetMapping(value = "/testing")
    public @ResponseBody String testing(@RequestParam String username) throws SQLException {
        //getMySqlDataSource(username);
        return Utils.gson().toJson("");
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
