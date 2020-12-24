package com.structure.services;

import java.util.ArrayList;
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
    private Utils utility;

    public Map<String, String> saveClassroomOrReturnErrors(String teacherId, ArrayList<Student> students, String className){
        Classroom classroom = new Classroom(utility.generateUniqueId(), className, teacherId);
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
                if(stu.getId() == null)
                    fillStudentData(stu, classroom.getId());
            });
            classroom.setStudents(studentArrayList);
            classroomRepo.save(classroom);
        }
        return errors;
    }

    private void fillStudentData(Student stu, String classroomId){
        stu.setId(Utils.generateUniqueId());
        stu.setEnabled(1);
        stu.setClassroomId(classroomId);
        stu.setGoals(new ArrayList<Goal>());
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