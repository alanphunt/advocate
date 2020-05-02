package com.structure.controllers;

import com.structure.repositories.TrialRepo;
import com.structure.utilities.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class TrialController {

    @Autowired
    TrialRepo tr;

    @PostMapping(name = "/api/createtrial")
    public ResponseEntity<?> createTrial(@RequestParam Map<String, String> body){

        String id = Utils.generateUniqueId();

        return ResponseEntity.ok("");
    }
}
