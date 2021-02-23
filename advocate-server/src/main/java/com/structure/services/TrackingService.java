package com.structure.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.structure.models.Baseline;
import com.structure.models.Tracking;
import com.structure.models.Trial;
import com.structure.models.TrialTemplates;
import com.structure.utilities.Constants;
import com.structure.utilities.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class TrackingService {
    @Autowired
    private Utils utilService;

    public void setTrackingInfo(List<Tracking> tracks, String id, Class<?> clazz){
        System.out.println("Setting tracking info..");
        for(Tracking t : tracks){
            System.out.println(t.toString());
            if(t.getId() == null || t.getId().isBlank()){
                t.setId(utilService.generateUniqueId());
                if(clazz == Baseline.class){
                    t.setTrialId(null);
                    t.setBaselineId(id);
                }else if(clazz == Trial.class) {
                    t.setBaselineId(null);
                    t.setTrialId(id);
                }
                t.setEnabled(1);
            }
        }
    }

    public ArrayList<Tracking> determineTrackingErrors(Map<String, String> errors, String trackings, String template) {
        ArrayList<Tracking> tracks = new ArrayList<>();
        try {
            if(template.equals(TrialTemplates.SCORE_BASIC.name()))
                tracks = utilService.fromJSON(new TypeReference<>() {}, trackings);
            else{
                Tracking t = utilService.fromJSON(new TypeReference<>() {}, trackings);
                tracks.add(t);
            }
        }catch(Exception e) {
            System.out.println(e.getMessage());
        }

        if (template.equals(TrialTemplates.SCORE_BASIC.name())) {
            for(Tracking t : tracks) {
                if (t.getLabel().isBlank())
                    errors.put("label", Constants.EMPTY_TRACK_LABEL_RESPONSE);
            }
        } else if (template.equals(TrialTemplates.SCORE_BEST_OUT_OF.name())) {
            for(Tracking t : tracks) {
                try {
                    if (t.getBest() < 0 || t.getOutOf() <= 0)
                        throw new Exception(Constants.NUMBER_FORMAT_ERROR_RESPONSE);
                    if (t.getBest() > t.getOutOf())
                        throw new Exception(Constants.NUMERATOR_LESS_THAN_DENOMINATOR_RESPONSE);
                    NumberFormat nf = new DecimalFormat("0.0");
                    t.setAccuracyPercentage(Double.parseDouble(nf.format((double)t.getBest()/t.getOutOf()*100)));
                } catch (Exception e) {
                    errors.put("bestOutOf", e.getMessage());
                }
            }
        }
        return tracks;
    }

}
