package com.structure.repositories;

import com.structure.models.Benchmark;
import org.springframework.data.repository.CrudRepository;

public interface BenchmarkRepo extends CrudRepository<Benchmark, String> {
}
