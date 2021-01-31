package com.structure.services;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

import javax.servlet.http.HttpServletRequest;

import com.fasterxml.jackson.core.type.TypeReference;
import com.structure.models.Document;
import com.structure.models.Tracking;
import com.structure.models.Trial;
import com.structure.repositories.TrialRepo;
import com.structure.utilities.Constants;
import com.structure.utilities.Utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class TrialService {
    
    @Autowired
    private DocumentService docService;
    
    @Autowired
    private TrialRepo tr;

    @Autowired 
    private Utils utilService;

    public Map<String, String> handleTrialCreation(Map<String, String> errors, Trial trial, String trackings, String docMeta, List<MultipartFile> docFiles, HttpServletRequest req){
        determineTrialErrors(errors, trial, trackings);
        if(errors.isEmpty()){
            System.out.println("No errors in trial input found.");
            try {
                trial.setLabel("Trial #" + trial.getTrialNumber() + " - " + new SimpleDateFormat(Constants.DATE_FORMAT).format(trial.getDateStarted()));
                trial.setDocuments(utilService.fromJSON(new TypeReference<>() {}, docMeta));
            }catch (Exception e){
                System.out.println("failed to deserialize document meta data");
                System.out.println(e.getMessage());
            }

            trial.setId(utilService.generateUniqueId());

            setTrackingInfo(trial.getTrackings(), trial.getId());
            handleTrialDocuments(trial, docFiles, req);
            tr.save(trial);
        }
        return errors;
    }

    public Map<String, String> handleTrialEdit(String trialString, String trackings, String documentMeta, List<MultipartFile> documents, HttpServletRequest req){
        Trial trial = null;
        try{
            trial = utilService.fromJSON(new TypeReference<>() {}, trialString);
            ArrayList<Document> docs;
            try{
                docs = utilService.fromJSON(new TypeReference<>() {}, documentMeta);
                trial.setDocuments(docs);
            }catch(Exception e){
                System.out.println("failed to parse docs");
                System.out.println(e.getMessage());
            }
        }catch(Exception e){
            System.out.println("failed to parse trial");
            System.out.println(e.getMessage());
        }
        Map<String, String> errors = new HashMap<>();
        determineTrialErrors(errors, trial, trackings);
        if(errors.isEmpty() && trial != null){
            handleTrialDocuments(trial, documents, req);
            setTrackingInfo(trial.getTrackings(), trial.getId());
            docService.deleteOldFileIfNecessary(trial);
            tr.save(trial);
        }
        return errors;
    }

    public void handleTrialDeletion(String id, String benchmarkId){
        tr.deleteById(id);
        ArrayList<Trial> trials = tr.findAllByBenchmarkId(benchmarkId);

        for(int i = 0; i < trials.size(); i++){
            Trial trial = trials.get(i);
            trial.setTrialNumber(i+1);
            trial.setLabel("Trial #"+(i+1)+" - "+new SimpleDateFormat(Constants.DATE_FORMAT).format(trial.getDateStarted()));
        }
    }

    private void handleTrialDocuments(Trial trial, List<MultipartFile> newFiles, HttpServletRequest req){
        System.out.println("Begin handling documents..");
        for(Document docMeta : trial.getDocuments()){
            System.out.println(docMeta.toString());
            if(newFiles != null){
                for(MultipartFile docFile : newFiles){
                    System.out.println(docFile.toString());
                    if(docFile.getOriginalFilename().equals(docMeta.getName())){
                        System.out.println("File names match");
                        try{
                            docService.handleDocumentUpload(req, docFile, trial.getId(), docMeta);
                        }catch(IOException io){
                            System.out.println(io.getMessage());
                        }
                    }else{
                        System.out.println("File names do not match.");
                    }
                }
            }
            else{
                System.out.println("no uploaded files attached to request");
            }
        }
    }

    private void setTrackingInfo(List<Tracking> tracks, String trialId){
        for(Tracking t : tracks){
            if(t.getId() == null){
                t.setId(utilService.generateUniqueId());
                t.setTrialId(trialId);
                t.setEnabled(1);
            }
        }
    }

    private void determineTrialErrors(Map<String, String> errors, Trial trial, String trackings){
        System.out.println("Checking trial input for errors..");
//        Map<String, String> errors = new HashMap<>();
        if(!trackings.isBlank()){
            try{
                trial.setTrackings(utilService.fromJSON(new TypeReference<>() {}, trackings));
            }catch(Exception e){
                System.out.println(e.getMessage());
                errors.put("label", Constants.EMPTY_TRACK_LABEL_RESPONSE);
            }
        }

        for(Tracking t : trial.getTrackings()){
            if(t.getLabel().isBlank())
            errors.put("label", Constants.EMPTY_TRACK_LABEL_RESPONSE);
        }
//        return errors;
    }
}

