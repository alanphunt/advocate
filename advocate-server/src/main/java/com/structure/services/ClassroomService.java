package com.structure.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import com.structure.models.Classroom;
import com.structure.models.Goal;
import com.structure.models.Student;
import com.structure.repositories.ClassroomRepo;
import com.structure.utilities.Constants;
import com.structure.utilities.Utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClassroomService{

    @Autowired
    private ClassroomRepo classroomRepo;

    @Autowired
    private Utils utils;

    public Map<String, String> saveClassroomOrReturnErrors(String teacherId, ArrayList<Student> students, String className){
        Classroom classroom = new Classroom(utils.generateUniqueId(), className, teacherId);
        Map<String, String> errors = determineClassroomError(students, classroom);
        
        if(errors.size() == 0){
            students.forEach(stu -> {
                fillStudentData(stu, classroom.getId());
            });
            classroom.setStudents(students);
            classroomRepo.save(classroom);
        }
        return errors;
    }

    public void deleteClassroom(String classroomId){
        classroomRepo.deleteById(classroomId);
    }

    public Map<String, String> updateClassroomOrReturnErrors(Classroom classroom){
        ArrayList<Student> studentArrayList = (ArrayList<Student>) classroom.getStudents();
        Map<String, String> errors = determineClassroomError(studentArrayList, classroom);

        if(errors.size() == 0){
            classroom.getStudents().forEach(stu -> {
                if(stu.getGoalIds().isEmpty())
                    stu.setGoals(new ArrayList<>());
                if(stu.getClassroomId().isBlank())
                    fillStudentData(stu, classroom.getId());

            });
            classroom.setStudents(studentArrayList);
            classroomRepo.save(classroom);
        }
        return errors;
    }

    private void fillStudentData(Student stu, String classroomId){
        stu.setId(utils.generateUniqueId());
        stu.setEnabled(1);
        stu.setClassroomId(classroomId);
    }

    private Map<String, String> determineClassroomError(ArrayList<Student> students, Classroom classroom){
        Map<String, String> errs = new HashMap<>();
        if(classroom.getClassName().isBlank())
            errs.put("className", Constants.CLASSNAME_EMPTY_RESPONSE);

        for (Student student : students) {
            if ( student.getName().isBlank()
                    || student.getAge().isBlank()
                    || student.getGrade().isBlank()
                ){
                errs.put("students", Constants.STUDENTS_EMPTY_RESPONSE);
                break;
            }
        }
        if(students.isEmpty())
            errs.put("students", Constants.NO_STUDENTS_RESPONSE);
        return errs;
    } 


}