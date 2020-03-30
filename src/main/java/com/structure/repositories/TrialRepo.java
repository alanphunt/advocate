package com.structure.repositories;

import com.structure.models.Trial;
import org.springframework.data.repository.CrudRepository;

public interface TrialRepo extends CrudRepository<Trial, String> {
}
