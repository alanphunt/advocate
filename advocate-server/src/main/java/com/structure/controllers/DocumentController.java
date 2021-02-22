package com.structure.controllers;

import com.structure.services.DocumentService;
import com.structure.utilities.Constants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(path=Constants.API_PATH)
public class DocumentController {

    @Autowired
    private DocumentService docService;

    @PostMapping(value = "/retrievedocument")
    public ResponseEntity<?> retrieveDocumentBytes(@RequestBody Map<String, String> body){
        return docService.handleDocumentBytesRetrieval(body.get("path"), body.get("name"), body.get("type"));
    }

}
