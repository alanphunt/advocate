package com.structure.repositories;

import com.structure.models.Tracking;
import org.springframework.data.repository.CrudRepository;

public interface TrackingRepo extends CrudRepository<Tracking, String> {
}
