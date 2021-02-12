package com.structure.controllers;

import com.structure.models.Trial;
import com.structure.services.LoginService;
import com.structure.services.TrialService;
import com.structure.utilities.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path=Constants.API_PATH, method = {RequestMethod.POST})
public class TrialController {

    @Autowired
    private LoginService ls;

    @Autowired
    private TrialService trialService;

    @PostMapping(value = "/createtrial")
    public ResponseEntity<?> createTrial(HttpServletRequest req, @RequestParam Map<String, String> body, @RequestParam List<MultipartFile> documents){
        System.out.println("Creating trial..");
        Map<String, String> potentialErrors = new HashMap<>();
        Date startDate = null;

        try{
            SimpleDateFormat sdf = new SimpleDateFormat(Constants.DATE_FORMAT);
            if(!body.get("dateStarted").isBlank())
                startDate = sdf.parse(body.get("dateStarted"));
            else
                throw new Exception("Empty date");
        }catch(Exception e){
            System.out.println("failed to parse trial start date");
            potentialErrors.put("dateStarted", Constants.INVALID_DATE_FORMAT);
        }

        Trial trial = new Trial("", Integer.parseInt(body.get("trialNumber")), startDate, body.get("comments"), body.get("benchmarkId"));
        trial.setTrialTemplate(body.get("trialTemplate"));
        trialService.handleTrialCreation(potentialErrors, trial, body.get("trackings"), body.get("documentMeta"), documents, req);

        if(potentialErrors.isEmpty())
            return ls.handleTeacherRehydration();

        return ResponseEntity.badRequest().body(potentialErrors);
    }

    @PostMapping(value = "/edittrial")
    public ResponseEntity<?> editTrial(@RequestParam String trial, @RequestParam String trackings, @RequestParam String documentMeta, @RequestParam List<MultipartFile> documents, HttpServletRequest req){
        Map<String, String> potentialErrors = trialService.handleTrialEdit(trial, trackings, documentMeta, documents, req);
        if(!potentialErrors.isEmpty())
            return ResponseEntity.badRequest().body(potentialErrors);
            
            return ls.handleTeacherRehydration();
    }

    @DeleteMapping(value = "/deletetrial")
    public ResponseEntity<?> deleteTrial(String trialId, String benchmarkId){
        trialService.handleTrialDeletion(trialId, benchmarkId);
        return ls.handleTeacherRehydration();
    }
}
