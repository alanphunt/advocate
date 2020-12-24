package com.structure.controllers;

import com.structure.models.Classroom;
import com.structure.models.Student;
import com.structure.utilities.Constants;
import com.structure.services.ClassroomService;
import com.structure.utilities.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping(path=Constants.API_PATH)
public class ClassroomController {

    @Autowired
    private ClassroomService crs;

    @Autowired
    private LoginController loginController;

    @Autowired
    private Utils utils;

    @PostMapping(value="/createclassroom")
    public ResponseEntity<?> createClassroom(HttpServletRequest request, @RequestBody Map<String, String> body){
        String teacherId = body.get("teacherId");
        ArrayList<Student> students = utils.gson().fromJson(body.get("students"), utils.getListType(Student.class));
        String className = body.get("className");

        Map<String, String> errors = crs.saveClassroomOrReturnErrors(teacherId, students, className);
        if(errors.size() == 0)
            return loginController.getTeacher(request);

        return ResponseEntity.status(Constants.HTTP_BAD_REQUEST)
                .body(Utils.gson().toJson(errors));

    }

    @DeleteMapping(value = "/deleteclassroom")
    public ResponseEntity<?> deleteClassroom(HttpServletRequest request, @RequestBody Map<String, String>body){
        crs.deleteClassroom(body.get("classroomId"));
        return loginController.getTeacher(request);
    }

    @PutMapping(value = "/updateclassroom")
    public ResponseEntity<?> updateClassroom(HttpServletRequest request, @RequestBody String body){
        Classroom classroom = utils.gson().fromJson(body, Classroom.class);
        Map<String, String> errors = crs.updateClassroomOrReturnErrors(classroom);

        if(errors.size() == 0)
            return loginController.getTeacher(request);
        
        return ResponseEntity.status(Constants.HTTP_BAD_REQUEST).body(utils.gson().toJson(errors));

    }


}
