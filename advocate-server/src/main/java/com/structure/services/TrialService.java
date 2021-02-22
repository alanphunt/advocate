package com.structure.services;

import java.text.SimpleDateFormat;
import java.util.*;

import javax.servlet.http.HttpServletRequest;

import com.fasterxml.jackson.core.type.TypeReference;
import com.structure.models.Document;
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

    @Autowired
    private TrackingService ts;

    public void handleTrialCreation(Map<String, String> errors, Trial trial, String trackings, String docMeta, List<MultipartFile> docFiles, HttpServletRequest req){
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

            ts.setTrackingInfo(trial.getTrackings(), trial.getId(), Trial.class);
//            handleTrialDocuments(trial, docFiles, req);
            docService.handleDocuments(trial.getDocuments(), trial.getId(), Trial.class, docFiles, req);
            tr.save(trial);
        }
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
            docService.handleDocuments(trial.getDocuments(), trial.getId(), Trial.class, documents, req);
//            handleTrialDocuments(trial, documents, req);
            ts.setTrackingInfo(trial.getTrackings(), trial.getId(), Trial.class);
            docService.deleteOldFileIfNecessary(trial);
            tr.save(trial);
        }
        return errors;
    }

    public void handleTrialDeletion(String id, String benchmarkId, HttpServletRequest request){
        docService.deleteAllServerFilesById(id, request);
        tr.deleteById(id);
        List<Trial> trials = tr.findAllByBenchmarkId(benchmarkId);
        for(int i = 0; i < trials.size(); i++){
            Trial trial = trials.get(i);
            System.out.println(trial.toString());
            trial.setTrialNumber(i+1);
            trial.setLabel("Trial #"+(i+1)+" - "+new SimpleDateFormat(Constants.DATE_FORMAT).format(trial.getDateStarted()));
        }
        tr.saveAll(trials);
    }

/*
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
*/



    private void determineTrialErrors(Map<String, String> errors, Trial trial, String trackings){
        System.out.println("Checking trial input for errors..");

        if(trial.getDateStarted() == null)
            errors.put("dateStarted", Constants.INVALID_DATE_FORMAT);

        trial.setTrackings(ts.determineTrackingErrors(errors, trackings, trial.getTrialTemplate()));

/*        if(trial.getTrialTemplate().equals(TrialTemplates.SCORE_BASIC.name())){
            if(!trackings.isBlank()){
                try{
                    trial.setTrackings(utilService.fromJSON(new TypeReference<>() {}, trackings));
                }catch(Exception e){
                    System.out.println(e.getMessage());
                    errors.put("label", Constants.EMPTY_TRACK_LABEL_RESPONSE);
                }
                for(Tracking t : trial.getTrackings()){
                    if(t.getLabel().isBlank())
                        errors.put("label", Constants.EMPTY_TRACK_LABEL_RESPONSE);
                }
            }
        }
        else if(trial.getTrialTemplate().equals(TrialTemplates.SCORE_BEST_OUT_OF.name())){
            try{
                Tracking track = utilService.fromJSON(new TypeReference<>() {}, trackings);
                if(track.getBest() < 0 || track.getOutOf() <= 0)
                    throw new Exception(Constants.NUMBER_FORMAT_ERROR_RESPONSE);
                if(track.getBest() > track.getOutOf())
                    throw new Exception(Constants.NUMERATOR_LESS_THAN_DENOMINATOR_RESPONSE);
                trial.setTrackings(Collections.singletonList(track));

            }catch(Exception e){
                errors.put("bestOutOf", e.getMessage());
            }
        }*/


    }
}

