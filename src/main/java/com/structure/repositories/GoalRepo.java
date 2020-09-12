package com.structure.repositories;

import com.structure.models.Goal;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;


@Repository
public interface GoalRepo extends CrudRepository<Goal, String> {

    @Modifying
    @Transactional(timeout = 5)
    @Query("UPDATE Goal goal SET goal.complete = ?2, goal.completionDate = ?3 WHERE goal.id = ?1")
    int updateCompletionStatus(String id, int complete, Date completionDate);

    @Modifying
    @Transactional(timeout = 5)
    @Query("UPDATE Goal goal SET goal.enabled = 0 WHERE goal.id = ?1")
    int softDeleteGoalById(String id);

    @Modifying
    @Transactional(timeout = 5)
    @Query("DELETE FROM Goal goal WHERE goal.id = ?1")
    int hardDeleteGoalById(String id);
}
