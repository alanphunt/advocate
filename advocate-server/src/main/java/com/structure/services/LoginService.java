package com.structure.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.structure.models.AuthRequest;
import com.structure.models.Benchmark;
import com.structure.models.Classroom;
import com.structure.models.Document;
import com.structure.models.Goal;
import com.structure.models.Student;
import com.structure.models.Teacher;
import com.structure.models.TeacherDTO;
import com.structure.models.Tracking;
import com.structure.models.Trial;
import com.structure.utilities.AccountDetailsRequestBean;
import com.structure.utilities.Constants;

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

    public ResponseEntity<?> handleTeacherRehydration(){
        try {
            return ResponseEntity.ok(mapTeacherToTeacherDTO(teacherService.findTeacherByUsername(detailsBean.getAccountDetails().getUsername())));
        } catch (Exception npe) {
            Map<String, String> errors = new HashMap<>();
            errors.put("error", Constants.SERVER_ERROR);
            return ResponseEntity.status(Constants.HTTP_UNAUTHORIZED).body(errors);
        }
    }

    public ResponseEntity<?> handleLogin(AuthRequest authRequest, HttpServletResponse resp){
        Authentication auth = null;
        try {
            auth = authMan.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(determineLoginErrors(authRequest));
        }
        // AccountDetails details = (AccountDetails) auth.getPrincipal();
        Teacher teacher = teacherService.findTeacherByUsername(auth.getName());
        jwtUtil.createAndAddJwtToCookie(jwtUtil.generateToken(auth.getName()), resp);
        return ResponseEntity.ok(mapTeacherToTeacherDTO(teacher));
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

    private Map<String, String> determineLoginErrors(AuthRequest auth) {
        Map<String, String> errors = new HashMap<>();
        errors.put("login", "Username or password is incorrect.");
        return errors;
    }

    private TeacherDTO mapTeacherToTeacherDTO(Teacher teacher) {
        TeacherDTO dto = new TeacherDTO();
        dto.setTeacher(teacher);
        dto.getTeacher().setClassroomIds(new ArrayList<>());

        Map<String, Classroom> classrooms = new HashMap<>();
        Map<String, Student> students = new HashMap<>();
        Map<String, Goal> goals = new HashMap<>();
        Map<String, Benchmark> benchmarks = new HashMap<>();
        Map<String, Trial> trials = new HashMap<>();
        Map<String, Tracking> trackings = new HashMap<>();
        Map<String, Document> documents = new HashMap<>();
        for(Classroom c : teacher.getClassrooms()){
            classrooms.put(c.getId(), c);
            dto.getTeacher().getClassroomIds().add(c.getId());
            for(Student s : c.getStudents()){
                c.getStudentIds().add(s.getId());
                students.put(s.getId(), s);
                for(Goal g : s.getGoals()){
                    s.getGoalIds().add(g.getId());
                    goals.put(g.getId(), g);
                    for(Benchmark b : g.getBenchmarks()){
                        g.getBenchmarkIds().add(b.getId());
                        benchmarks.put(b.getId(), b);
                        for(Trial t : b.getTrials()){
                            b.getTrialIds().add(t.getId());
                            trials.put(t.getId(), t);
                            for(Tracking tr : t.getTrackings()){
                                t.getTrackingIds().add(tr.getId());
                                trackings.put(tr.getId(), tr);
                            }
                            for(Document d : t.getDocuments()){
                                t.getDocumentIds().add(d.getId());
                                documents.put(d.getId(), d);
                            }
                        }
                    }
                }
            }
        }
        
        dto.setClassrooms(classrooms);
        dto.setStudents(students);
        dto.setGoals(goals);
        dto.setBenchmarks(benchmarks);
        dto.setTrials(trials);
        dto.setTrackings(trackings);
        dto.setDocuments(documents);
        return dto;
    } 
}
