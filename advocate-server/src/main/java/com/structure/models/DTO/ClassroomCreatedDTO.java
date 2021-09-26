package com.structure.models.DTO;

import com.structure.models.Classroom;
import com.structure.models.Student;

import java.util.HashMap;
import java.util.Map;

public class ClassroomCreatedDTO {
  private Map<String, Student> students;
  private Map<String, Classroom> classroom;

  public ClassroomCreatedDTO(){
    this.students = new HashMap<>();
    this.classroom = new HashMap<>();
  }

  public Map<String, Student> getStudents() {
    return students;
  }

  public void setStudents(Map<String, Student> students) {
    this.students = students;
  }

  public Map<String, Classroom> getClassroom() {
    return classroom;
  }

  public void setClassroom(Map<String, Classroom> classroom) {
    this.classroom = classroom;
  }

  @Override
  public String toString() {
    return "ClassroomCreatedDTO{" +
        "students=" + students +
        ", classroom=" + classroom +
        '}';
  }
}
