package com.structure.repositories;

import com.structure.models.Goal;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoalRepo extends CrudRepository<Goal, String> {
}
