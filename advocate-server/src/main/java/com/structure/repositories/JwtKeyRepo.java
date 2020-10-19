package com.structure.repositories;

import com.structure.models.JwtKey;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(readOnly = true)
public interface JwtKeyRepo extends CrudRepository<JwtKey, String> {
    JwtKey getById(String id);
}
