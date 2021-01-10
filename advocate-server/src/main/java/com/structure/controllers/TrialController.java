package com.structure.controllers;

import com.google.gson.reflect.TypeToken;
import com.structure.models.Document;
import com.structure.models.Tracking;
import com.structure.models.Trial;
import com.structure.repositories.BenchmarkRepo;
import com.structure.repositories.TrackingRepo;
import com.structure.repositories.TrialRepo;
import com.structure.services.DocumentService;
import com.structure.utilities.Constants;
import com.structure.utilities.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import javax.servlet.http.HttpServletRequest;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path=Constants.API_PATH, method = {RequestMethod.GET, RequestMethod.POST})
public class TrialController {

    @Autowired
    TrialRepo tr;

    @Autowired
    TrackingRepo trkr;

    @Autowired
    BenchmarkRepo bmr;

    @Autowired
    DocumentService docService;

    @Autowired
    private LoginController LC;

    @PostMapping(value = "/createTrial")
    public ResponseEntity<?> createTrial(HttpServletRequest req, @RequestParam Map<String, String> body){
        String trialId = Utils.generateUniqueId();
        Trial trial = new Trial(trialId, Integer.parseInt(body.get("trialNumber")), new Date(), body.get("comments"), body.get("benchmarkId"));

        Type listType = new TypeToken<List<Tracking>>() {}.getType();
        List<Tracking> tracks = Utils.gson().fromJson(body.get("tracking"), listType);
        for(Tracking t : tracks){
            setTrackingInfo(t, trialId);
        }
        trial.setTrackings(tracks);
        trial.setDocuments(new ArrayList<Document>());
        System.out.println(trial.toString());

        tr.save(trial);

        return LC.getTeacher(req);
    }

    @PostMapping(value = "/edittrial")
    public ResponseEntity<?> editTrial(@RequestParam String body, @RequestParam List<MultipartFile> documents, HttpServletRequest req){
        Trial trial = Utils.gson().fromJson(body, Trial.class);
        for(Document documentToModify : trial.getDocuments()){
            if(documents != null)
                for(MultipartFile doc : documents){
                    if(doc.getOriginalFilename().equals(documentToModify.getName())){
                        try{
                            docService.handleDocumentUpload(req, doc, trial.getId(), documentToModify);
                        }catch(IOException io){
                            System.out.println(io.getMessage());
                        }
                    }
                }
        }

        for(Tracking t : trial.getTrackings()){
            if(t.getId() == null)
                setTrackingInfo(t, trial.getId());
        }
        docService.deleteOldFileIfNecessary(trial);
        tr.save(trial);
        return LC.getTeacher(req);
    }

    private void setTrackingInfo(Tracking t, String trialId){
        t.setId(Utils.generateUniqueId());
        t.setTrialId(trialId);
        t.setEnabled(1);
    }

}
