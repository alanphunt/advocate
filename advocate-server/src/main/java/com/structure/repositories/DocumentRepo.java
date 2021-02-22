package com.structure.repositories;

import java.util.ArrayList;
import java.util.Optional;

import com.structure.models.Document;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentRepo extends CrudRepository<Document, String> {
    Optional<Document> findDocumentByName(String filename);

    ArrayList<Document> findAllByTrialId(String trialId);
    
}
