package com.structure.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.structure.models.Classroom;
import com.structure.models.Student;
import com.structure.utilities.AccountDetailsRequestBean;
import com.structure.utilities.Constants;
import com.structure.services.ClassroomService;
import com.structure.services.LoginService;
import com.structure.utilities.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping(path=Constants.API_PATH)
public class ClassroomController {

    @Autowired
    private ClassroomService crs;

    @Autowired
    private LoginService ls;

    @Autowired
    private Utils utils;

    @Autowired
    private AccountDetailsRequestBean detailsBean;

    @PostMapping(value="/createclassroom")
    public ResponseEntity<?> createClassroom(@RequestBody Map<String, String> body){
        ArrayList<Student> students = null;
        try {
            students = utils.fromJSON(new TypeReference<>() {}, body.get("students"));
        }catch(Exception e){
            System.out.println(e.getClass());
        }
        String className = body.get("className");
        Map<String, String> errors = crs.saveClassroomOrReturnErrors(detailsBean.getAccountDetails().getTeacherId(), students, className);
        if(errors.size() == 0)
            return ls.handleTeacherRehydration();

        return ResponseEntity.status(Constants.HTTP_BAD_REQUEST).body(errors);

    }

    @DeleteMapping(value = "/deleteclassroom")
    public ResponseEntity<?> deleteClassroom(String classroomId){
        crs.deleteClassroom(classroomId);
        return ls.handleTeacherRehydration();
    }

    @PutMapping(value = "/updateclassroom")
    public ResponseEntity<?> updateClassroom(@RequestBody Classroom body){
        Map<String, String> errors = crs.updateClassroomOrReturnErrors(body);

        if(errors.size() == 0)
            return ls.handleTeacherRehydration();

        return ResponseEntity.status(Constants.HTTP_BAD_REQUEST).body(errors);

    }


}
