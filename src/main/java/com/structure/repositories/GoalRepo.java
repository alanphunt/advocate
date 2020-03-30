package com.structure.repositories;

import com.structure.models.Goal;
import org.springframework.data.repository.CrudRepository;

public interface GoalRepo extends CrudRepository<Goal, String> {
}
