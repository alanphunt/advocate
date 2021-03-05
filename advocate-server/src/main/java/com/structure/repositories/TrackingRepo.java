package com.structure.repositories;

import com.structure.models.Tracking;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface TrackingRepo extends CrudRepository<Tracking, String> {

/*    @Modifying
    @Transactional
    @Query("UPDATE Tracking t SET t.enabled = 0 WHERE t.id = ?1")
    int softDeleteAllByTrialId(String id);*/

}
