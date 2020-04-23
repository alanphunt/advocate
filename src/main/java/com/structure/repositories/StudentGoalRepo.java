package com.structure.repositories;

import com.structure.models.StudentGoal;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentGoalRepo extends CrudRepository<StudentGoal, String> {
    List<StudentGoal> findStudentGoalByStuIdAndEnabled(String stuId, int enabled);
    List<StudentGoal> findStudentGoalByGoalIdAndEnabled(String goalId, int enabled);
}
