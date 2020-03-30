package com.structure.repositories;

import com.structure.models.Student;
import org.springframework.data.repository.CrudRepository;

public interface StudentRepo extends CrudRepository<Student, String> {
}
