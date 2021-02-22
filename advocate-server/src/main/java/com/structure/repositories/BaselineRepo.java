package com.structure.repositories;

import com.structure.models.Baseline;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BaselineRepo extends CrudRepository<Baseline, String> {
}
