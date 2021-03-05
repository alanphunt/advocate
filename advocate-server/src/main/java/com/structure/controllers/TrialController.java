package com.structure.controllers;

import com.structure.models.Trial;
import com.structure.services.LoginService;
import com.structure.services.TrialService;
import com.structure.utilities.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import java.util.List;

@RestController
@RequestMapping(path=Constants.API_PATH, method = {RequestMethod.POST})
@Validated
public class TrialController {

    @Autowired
    private LoginService ls;

    @Autowired
    private TrialService trialService;

    @PostMapping(value = "/createtrial")
    public ResponseEntity<?> createTrial(HttpServletRequest req, @Valid @RequestPart Trial trial, @RequestPart(required = false) List<MultipartFile> documents){
        System.out.println("Creating trial..");
        trialService.handleTrialCreation(trial, documents, req);
        return ls.handleTeacherRehydration();
    }

    @PostMapping(value = "/edittrial")
    public ResponseEntity<?> editTrial(HttpServletRequest req, @Valid @RequestPart Trial trial, @RequestPart(required = false) List<MultipartFile> documents){
        trialService.handleTrialEdit(trial, documents, req);
        return ls.handleTeacherRehydration();
    }

    @DeleteMapping(value = "/deletetrial")
    public ResponseEntity<?> deleteTrial(String trialId, String benchmarkId, HttpServletRequest request){
        trialService.handleTrialDeletion(trialId, benchmarkId, request);
        return ls.handleTeacherRehydration();
    }
}
