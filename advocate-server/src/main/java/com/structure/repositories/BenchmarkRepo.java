package com.structure.repositories;

import com.structure.models.Benchmark;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Repository
public interface BenchmarkRepo extends CrudRepository<Benchmark, String> {

    @Modifying
    @Transactional(timeout = 5)
    @Query("UPDATE Benchmark bm SET bm.complete = ?2, bm.metDate = ?3 WHERE bm.id = ?1")
    int updateBenchmark(String id, int complete, Date metDate);

    @Modifying
    @Transactional(timeout = 5)
    @Query("UPDATE Benchmark bm SET bm.enabled = 0 WHERE bm.id = ?1")
    int softDeleteBenchmarkById(String id);

    @Modifying
    @Transactional(timeout = 5)
    @Query("UPDATE Benchmark bm SET bm.enabled = 0 WHERE bm.goalId = ?1")
    int softDeleteAllBenchmarksByGoalId(String id);

    @Modifying
    @Transactional(timeout = 5)
    @Query("UPDATE Benchmark bm SET bm.trialAverage = ?1 WHERE bm.id = ?2")
    int updateBenchmarkTrialAverage(double trialAverage, String id);
}
