package com.structure.repositories;

import com.structure.models.Benchmark;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BenchmarkRepo extends CrudRepository<Benchmark, String> {
}
