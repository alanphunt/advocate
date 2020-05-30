package com.structure.controllers;

import com.google.gson.reflect.TypeToken;
import com.structure.models.Classroom;
import com.structure.models.Student;
import com.structure.models.Teacher;
import com.structure.repositories.ClassroomRepo;
import com.structure.repositories.StudentRepo;
import com.structure.utilities.JWTUtil;
import com.structure.utilities.TeacherDetailsService;
import com.structure.utilities.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Type;
import java.util.ArrayList;

@RestController
@RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})
public class ClassroomController {

    @Autowired
    StudentRepo sr;

    @Autowired
    ClassroomRepo cr;

    @Autowired
    TeacherDetailsService tds;

    @Autowired
    JWTUtil jwtUtil;

    @PostMapping(value = "/api/createclassroom")
    public ResponseEntity<?> createClassroom(HttpServletRequest request, @RequestParam String students, @RequestParam String className){
        try {
            String username = jwtUtil.extractEmail(request.getHeader("Authorization").substring(7));
            Teacher teacher = (Teacher) tds.loadUserByUsername(username);
            Type listType = new TypeToken<ArrayList<Student>>() {}.getType();
            ArrayList<Student> studentArray = Utils.gson().fromJson(students, listType);
            Classroom classroom = cr.save(new Classroom(Utils.generateUniqueId(), className, teacher.getId()));

            studentArray.forEach(stu -> {
                stu.setId(Utils.generateUniqueId());
                stu.setClassroomId(classroom.getId());
                stu.setEnabled(1);
                sr.save(stu);
            });
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .header(HttpHeaders.LOCATION, "/classroom")
                    .build();
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unable to authenticate");
        }
    }
}
