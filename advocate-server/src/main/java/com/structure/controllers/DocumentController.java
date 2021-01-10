package com.structure.controllers;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.google.gson.JsonObject;
import com.structure.services.DocumentService;
import com.structure.utilities.Constants;
import com.structure.utilities.Utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path=Constants.API_PATH)
public class DocumentController {

    @Autowired
    DocumentService docService;

    @Autowired Utils util;

    @PostMapping(value = "/uploaddocument")
    public ResponseEntity<?> uploadDocument(HttpServletRequest request, @RequestParam MultipartFile file, @RequestParam String trialId){
        try{
            // docService.handleDocumentUpload(request, file, trialId);
        }catch(Exception io){
            for(StackTraceElement e : io.getStackTrace()){
                System.out.println(e.toString());
            }
            Map<String, String> error = new HashMap<String, String>();
            error.put("error", Constants.DOCUMENT_UPLOAD_FAIL_RESPONSE);
            return ResponseEntity.status(Constants.HTTP_BAD_REQUEST).body(error);
        }
        return ResponseEntity.ok("");
    }

    @PostMapping(value = "/retrievedocument")
    public ResponseEntity<?> retrieveDocumentBytes(HttpServletRequest request, @RequestBody String body){
        JsonObject details = util.gson().fromJson(body, JsonObject.class);

        return docService.handleDocumentBytesRetrieval(details.get("path").getAsString(), details.get("name").getAsString(), details.get("type").getAsString());
    }
}
