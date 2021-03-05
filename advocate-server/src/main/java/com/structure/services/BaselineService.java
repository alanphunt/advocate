package com.structure.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.structure.models.Baseline;
import com.structure.models.Tracking;
import com.structure.repositories.BaselineRepo;
import com.structure.utilities.Constants;
import com.structure.utilities.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Service
public class BaselineService {

    @Autowired
    private LoginService ls;

    @Autowired
    private Utils utilService;

    @Autowired
    private BaselineRepo br;

    @Autowired
    private DocumentService docService;

    @Autowired
    private TrackingService ts;

    public ResponseEntity<?> handleBaselineCreation(Baseline baseline, List<MultipartFile> documents, HttpServletRequest req){
//    public ResponseEntity<?> handleBaselineCreation(String startDateString, String label, String trackings, String baselineString, List<MultipartFile> documents, HttpServletRequest req){
        Map<String, String> errors = new HashMap<>();
/*        Baseline baseline = null;
        System.out.println("Begin baseline creation");
        try {
            baseline = utilService.fromJSON(new TypeReference<>() {}, baselineString);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }*/
//        if(baseline != null) {
            System.out.println("Baseline successfully parsed");
 /*           ArrayList<Tracking> tracks = ts.determineTrackingErrors(errors, trackings, baseline.getBaselineTemplate());
            Optional<Date> startDate = utilService.parseDate(startDateString);

            if(startDate.isEmpty())
                errors.put("dateStarted", Constants.INVALID_DATE_FORMAT);
            else
                baseline.setDateStarted(startDate.get());

            if(label.isBlank())
                errors.put("baselineLabel", Constants.EMPTY_FIELD_RESPONSE);
            else
                baseline.setLabel(label);*/

//            if(errors.isEmpty()){
                String baselineId = utilService.generateUniqueId();
//                ts.setTrackingInfo(tracks, baselineId, Baseline.class);
//                baseline.setTrackings(tracks);

                ts.setTrackingInfo(baseline.getTracking(), baseline.getId(), Baseline.class);

//                ts.setTrackingInfo(baseline.getTrackings(), baselineId, Baseline.class);
                docService.handleDocuments(baseline.getDocuments(), baselineId, Baseline.class, documents, req);

                baseline.setId(baselineId);
                baseline.setEnabled(1);
                br.save(baseline);
                return ls.handleTeacherRehydration();
//            }
//        }
//        return ResponseEntity.badRequest().body(errors);
    }

    public ResponseEntity<?> handleBaselineDeletion(HttpServletRequest request, String id){
        br.deleteById(id);
        docService.deleteAllServerFilesById(id, request);
        return ls.handleTeacherRehydration();
    }
}
