package com.structure.services;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

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
    DocumentService docService;
    
    @Autowired
    TrialRepo tr;

    @Autowired 
    Utils utilService;

    public Map<String, String> handleTrialCreation(Trial trial, String trackings, String docMeta, List<MultipartFile> docFiles, HttpServletRequest req){
        trial.setTrackings(utilService.gson().fromJson(trackings, utilService.getListType(Tracking.class)));
        Map<String, String> errors = determineTrialErrors(trial);
        if(errors.isEmpty()){
            trial.setDocuments(utilService.gson().fromJson(docMeta, utilService.getListType(Document.class)));
            trial.setId(utilService.generateUniqueId());

            setTrackingInfo(trial.getTrackings(), trial.getId());
            handleTrialDocuments(trial, docFiles, req);
            tr.save(trial);
        }
        return errors;
    }

    public Map<String, String> handleTrialEdit(Trial trial, List<MultipartFile> documents, HttpServletRequest req){
        Map<String, String> errors = determineTrialErrors(trial);
        if(errors.isEmpty()){
            handleTrialDocuments(trial, documents, req);
            setTrackingInfo(trial.getTrackings(), trial.getId());
            tr.save(trial);
        }
        return errors;
    }

    private void handleTrialDocuments(Trial trial, List<MultipartFile> documents, HttpServletRequest req){
        for(Document documentToModify : trial.getDocuments()){
            if(documents != null){
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

    private Map<String, String> determineTrialErrors(Trial trial){
        Map<String, String> errors = new HashMap<String, String>();

        for(Tracking t : trial.getTrackings()){
            if(t.getLabel().isBlank())
            errors.put("label", Constants.EMPTY_TRACK_LABEL_RESPONSE);
        }
        return errors;
    }

}

