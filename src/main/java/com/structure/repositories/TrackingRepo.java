package com.structure.repositories;

import com.structure.models.Tracking;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrackingRepo extends CrudRepository<Tracking, String> {
}
