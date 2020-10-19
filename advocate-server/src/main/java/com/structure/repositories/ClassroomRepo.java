package com.structure.repositories;

import com.structure.models.Classroom;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ClassroomRepo extends CrudRepository<Classroom, String> {

    ArrayList<Classroom> getClassroomByTeacherIdAndEnabled(String teacherId, int enabled);

}
