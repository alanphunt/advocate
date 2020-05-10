package com.structure.controllers;

import com.structure.repositories.TrialRepo;
import com.structure.utilities.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})
public class TrialController {

    @Autowired
    TrialRepo tr;

    @PostMapping(value = "/api/createtrial")
    public ResponseEntity<?> createTrial(@RequestParam Map<String, String> body){
        body.forEach((val, ind) -> {
            System.out.println(val);
            System.out.println(ind);
        });
        System.out.println("here");
        String id = Utils.generateUniqueId();

        return ResponseEntity.ok("");
    }
}
