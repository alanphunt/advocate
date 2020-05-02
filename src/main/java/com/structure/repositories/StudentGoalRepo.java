package com.structure.repositories;

import com.structure.models.StudentGoal;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentGoalRepo extends CrudRepository<StudentGoal, String> {}
