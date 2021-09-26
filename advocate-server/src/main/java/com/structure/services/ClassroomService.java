package com.structure.services;

import java.util.ArrayList;

import com.structure.models.Classroom;
import com.structure.models.DTO.ClassroomCreatedDTO;
import com.structure.models.Student;
import com.structure.repositories.ClassroomRepo;
import com.structure.utilities.AccountDetailsRequestBean;
import com.structure.utilities.Utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClassroomService {

  @Autowired
  private ClassroomRepo classroomRepo;

  @Autowired
  private Utils utils;

  @Autowired
  private AccountDetailsRequestBean detailsBean;

  public ClassroomCreatedDTO handleClassroomCreation(Classroom classroom) {
    classroom.setTeacherId(detailsBean.getAccountDetails().getTeacherId());
    classroom.setId(utils.generateUniqueId());
    classroom.setEnabled(1);
    for (Student stu : classroom.getStudents()) {
      fillStudentData(stu, classroom.getId());
      classroom.getStudentIds().add(stu.getId());
    }
    classroomRepo.save(classroom);
    return mapDataToDTO(classroom);
  }

  public void deleteClassroom(String classroomId) {
    System.out.println("Deleting classroom " + classroomId);
    classroomRepo.deleteById(classroomId);
  }

  public ClassroomCreatedDTO handleClassroomUpdate(Classroom classroom) {
    classroom.getStudents().forEach(stu -> {
      if (stu.getGoalIds().isEmpty())
        stu.setGoals(new ArrayList<>());
      if (stu.getClassroomId().isBlank())
        fillStudentData(stu, classroom.getId());
    });
    classroomRepo.save(classroom);

    return mapDataToDTO(classroom);
  }

  private void fillStudentData(Student stu, String classroomId) {
    stu.setId(utils.generateUniqueId());
    stu.setEnabled(1);
    stu.setClassroomId(classroomId);
  }

  private ClassroomCreatedDTO mapDataToDTO(Classroom classroom) {
    ClassroomCreatedDTO dto = new ClassroomCreatedDTO();
    dto.getClassroom().put(classroom.getId(), classroom);
    for (Student stu : classroom.getStudents()) {
      dto.getStudents().put(stu.getId(), stu);
    }
    return dto;
  }

}