package com.structure.services;

import com.structure.models.Teacher;
import com.structure.repositories.TeacherRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeacherService {
    
    @Autowired
    private TeacherRepo teacherRepo;

    public Teacher saveTeacher(Teacher teacher){
        return teacherRepo.save(teacher);
    }

    public Teacher findTeacherByUsername(String username){
        return teacherRepo.findTeacherByUsername(username);
    }
}
