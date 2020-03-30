package com.structure.repositories;

import com.structure.models.Classroom;
import org.springframework.data.repository.CrudRepository;

public interface ClassroomRepo extends CrudRepository<Classroom, String> {
}
