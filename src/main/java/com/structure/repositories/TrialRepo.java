package com.structure.repositories;

import com.structure.models.Trial;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrialRepo extends CrudRepository<Trial, String> {
}
