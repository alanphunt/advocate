package com.structure.repositories;

import com.structure.models.Teacher;
import org.springframework.data.repository.CrudRepository;

public interface TeacherRepo extends CrudRepository<Teacher, String> {

    Teacher findTeacherByEmailAndEnabled(String email, int enabled);
}
