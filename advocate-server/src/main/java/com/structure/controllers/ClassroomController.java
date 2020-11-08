package com.structure.controllers;

import com.structure.models.Classroom;
import com.structure.models.Student;
import com.structure.models.Teacher;
import com.structure.repositories.ClassroomRepo;
import com.structure.repositories.StudentRepo;
import com.structure.services.JWTService;
import com.structure.services.TeacherDetailsService;
import com.structure.utilities.Utils;
import com.structure.utilities.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})
public class ClassroomController {
    @Autowired
    private StudentRepo sr;

    @Autowired
    private ClassroomRepo cr;

    @Autowired
    private TeacherDetailsService TDS;

    @Autowired
    private JWTService JWT_UTIL;

    @Autowired
    private LoginController LC;

    @PostMapping(value = "/api/createclassroom")
    public ResponseEntity<?> createClassroom(HttpServletRequest request, @RequestParam String students, @RequestParam String className, @RequestParam String teacherId){
        ArrayList<Student> studentArray = Utils.gson().fromJson(students, Utils.getListType(Student.class));
        Classroom classroom = new Classroom(Utils.generateUniqueId(), className, teacherId);
        Map<String, String> errs = determineClassroomError(studentArray, classroom);

        if(errs.size() == 0){
            studentArray.forEach(stu -> {
                stu.setId(Utils.generateUniqueId());
                stu.setClassroomId(classroom.getId());
                stu.setEnabled(1);
            });
            classroom.setStudents(studentArray);
            cr.save(classroom);
            return LC.getTeacher(request);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Utils.gson().toJson(errs));

    }

    private Map<String, String> determineClassroomError(ArrayList<Student> students, Classroom classroom){
        Map<String, String> errs = new HashMap<>();
        if(classroom.getClassName().isBlank())
            errs.put("className", Constants.CLASSNAME_EMPTY_RESPONSE);

        for (Student student : students) {
            if ( student.getName().isBlank()
                    || student.getGoalFocus().isBlank()
                    || student.getEligibility().isBlank()
                    || student.getSkills().isBlank()){
                errs.put("students", Constants.STUDENTS_EMPTY_RESPONSE);
                break;
            }
        }
        return errs;

    }
}
