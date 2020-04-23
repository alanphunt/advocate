package com.structure.controllers;

import com.google.gson.reflect.TypeToken;
import com.structure.models.Classroom;
import com.structure.models.Student;
import com.structure.repositories.ClassroomRepo;
import com.structure.repositories.StudentRepo;
import com.structure.utilities.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;

@RestController
@RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})
public class ClassroomController {

    @Autowired
    StudentRepo sr;

    @Autowired
    ClassroomRepo cr;

    @PostMapping(value = "/api/createclassroom")
    public ResponseEntity<?> createClassroom(HttpServletRequest request, @RequestParam String students, @RequestParam String className){
        try {
            Type listType = new TypeToken<ArrayList<Student>>() {}.getType();
            ArrayList<Student> studentArray = Utils.gson().fromJson(students, listType);
            Classroom classroom = cr.save(new Classroom(Utils.generateUniqueId(), className, Utils.getSessionUser(request).getId()));

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
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping(value = "/api/getclassroom")
    public ResponseEntity<?> getClassroom(HttpServletRequest request){
        try {
            ArrayList<Classroom> rooms = cr.getClassroomByTeacherIdAndEnabled(Utils.getSessionUser(request).getId(), 1);
            rooms.forEach(System.out::println);
        }catch(NullPointerException npe){
            System.out.println(Arrays.toString(npe.getStackTrace()));
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok("great");
    }
}
