package com.structure.controllers;

import com.structure.services.BaselineService;
import com.structure.utilities.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping(path= Constants.API_PATH, method = {RequestMethod.POST})
public class BaselineController {

    @Autowired
    private BaselineService baselineService;

    @PostMapping(value = "/createbaseline")
    public ResponseEntity<?> createBaseline(String startDate, String label, String trackings, String baseline, List<MultipartFile> documents, HttpServletRequest req){
        return baselineService.handleBaselineCreation(startDate, label, trackings, baseline, documents, req);
    }

    @DeleteMapping(value = "/deletebaseline")
    public ResponseEntity<?> deleteBaseline(@RequestParam String baselineId, HttpServletRequest request){
        return baselineService.handleBaselineDeletion(request, baselineId);
    }

    @PostMapping(value = "/editbaseline")
    public ResponseEntity<?> editBaseline(){
        return ResponseEntity.ok("");
    }

}
