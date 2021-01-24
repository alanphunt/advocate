package com.structure.controllers;

import com.structure.models.Trial;
import com.structure.services.LoginService;
import com.structure.services.TrialService;
import com.structure.utilities.Constants;
import com.structure.utilities.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path=Constants.API_PATH, method = {RequestMethod.POST})
public class TrialController {

    @Autowired
    private LoginService ls;

    @Autowired
    private TrialService trialService;

    @Autowired private Utils utils;


    @PostMapping(value = "/createtrial")
    public ResponseEntity<?> createTrial(HttpServletRequest req, @RequestParam Map<String, String> body, @RequestParam List<MultipartFile> documents){
        Trial trial = new Trial("", Integer.parseInt(body.get("trialNumber")), new Date(), body.get("comments"), body.get("benchmarkId"));
        Map<String, String> potentialErrors = trialService.handleTrialCreation(trial, body.get("trackings"), body.get("documentMeta"), documents, req);
        if(!potentialErrors.isEmpty())
            return ResponseEntity.badRequest().body(potentialErrors);

        return ls.handleTeacherRehydration();
    }

    @PostMapping(value = "/edittrial")
    public ResponseEntity<?> editTrial(@RequestParam String body, @RequestParam List<MultipartFile> documents, HttpServletRequest req){
        Trial trial = utils.gson().fromJson(body, Trial.class);
        Map<String, String> potentialErrors = trialService.handleTrialEdit(trial, documents, req);
        if(!potentialErrors.isEmpty())
            return ResponseEntity.badRequest().body(potentialErrors);
            
            return ls.handleTeacherRehydration();
    }

}
