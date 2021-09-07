package com.structure.controllers;

import com.structure.models.DTOs.AuthRequest;
import com.structure.services.LoginService;
import com.structure.utilities.Constants;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping(path = Constants.API_PATH, method = { RequestMethod.GET, RequestMethod.POST })
public class LoginController {

    @Autowired private LoginService loginService;

    @GetMapping(value = "/teacher")
    public ResponseEntity<?> getTeacher() {
        System.out.println("retrieving teacher..");
        return loginService.handleTeacherRehydration();
    }

    @PostMapping(value = "/authenticate")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest, HttpServletResponse resp) {
        return loginService.handleLogin(authRequest, resp);
    }

    @GetMapping(value = "/logout")
    public void logout(HttpServletRequest req, HttpServletResponse res) {
        loginService.handleLogout(req, res);
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
