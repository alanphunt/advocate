package com.structure.repositories;

import com.structure.models.Trial;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Repository
public interface TrialRepo extends CrudRepository<Trial, String> {

    @Modifying
    @Transactional(timeout = 5)
    @Query("UPDATE Trial t SET t.enabled = 0 WHERE t.benchmarkId = ?1")
    int softDeleteAllByBenchmarkId(String id);

    ArrayList<Trial> findAllByBenchmarkId(String benchmarkId);
}
