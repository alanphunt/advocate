package com.structure.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ser.Serializers;
import com.structure.models.Baseline;
import com.structure.models.Tracking;
import com.structure.models.TrackingMeta;
import com.structure.models.Trial;
import com.structure.utilities.Constants;
import com.structure.utilities.Utils;
import com.structure.utilities.constants.TrialTemplate;
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

  public void setTrackingInfo(Tracking tracking, String parentId, Class<?> clazz){
    System.out.println("Setting tracking info..");
    tracking.setId(utilService.generateUniqueId());
    if(clazz == Baseline.class){
      tracking.setBaselineId(parentId);
      tracking.setTrialId(null);
    }else{
      tracking.setBaselineId(null);
      tracking.setTrialId(parentId);
    }
    tracking.setEnabled(1);
    setTrackingMetaInfo(tracking.getId(), tracking.getTrackingMeta());
  }

  public void setTrackingMetaInfo(String trackingId, List<TrackingMeta> meta){
    for(TrackingMeta tm : meta){
      if(tm.getId().isBlank()){
        tm.setEnabled(1);
        tm.setTrackingId(trackingId);
        tm.setId(utilService.generateUniqueId());
      }
    }
  }

  public ArrayList<Tracking> determineTrackingErrors(Map<String, String> errors, String trackings, String template) {
    ArrayList<Tracking> tracks = new ArrayList<>();
    try {
      if(template.equals(TrialTemplate.SCORE_BASIC))
        tracks = utilService.fromJSON(new TypeReference<>() {}, trackings);
      else{
        Tracking t = utilService.fromJSON(new TypeReference<>() {}, trackings);
        tracks.add(t);
      }
    }catch(Exception e) {
      System.out.println(e.getMessage());
    }

    if (template.equals(TrialTemplate.SCORE_BASIC)) {
      for(Tracking t : tracks) {
        if (t.getLabel().isBlank())
          errors.put("label", Constants.EMPTY_TRACK_LABEL_RESPONSE);
      }
    } else if (template.equals(TrialTemplate.SCORE_BEST_OUT_OF)) {
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
