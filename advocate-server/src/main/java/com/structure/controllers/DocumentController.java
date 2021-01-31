package com.structure.controllers;

import com.google.gson.JsonObject;
import com.structure.services.DocumentService;
import com.structure.utilities.Constants;
import com.structure.utilities.Utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path=Constants.API_PATH)
public class DocumentController {

    @Autowired
    private DocumentService docService;

    @Autowired
    private Utils util;

    @PostMapping(value = "/retrievedocument")
    public ResponseEntity<?> retrieveDocumentBytes(@RequestBody String body){
        JsonObject details = util.gson().fromJson(body, JsonObject.class);

        return docService.handleDocumentBytesRetrieval(details.get("path").getAsString(), details.get("name").getAsString(), details.get("type").getAsString());
    }

}
