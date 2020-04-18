package com.structure.repositories;

import com.structure.models.Teacher;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepo extends CrudRepository<Teacher, String> {

    Teacher findTeacherByEmailAndEnabled(String email, int enabled);
}
