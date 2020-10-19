package com.structure.controllers;

import com.google.gson.reflect.TypeToken;
import com.structure.models.Tracking;
import com.structure.models.Trial;
import com.structure.repositories.BenchmarkRepo;
import com.structure.repositories.TrackingRepo;
import com.structure.repositories.TrialRepo;
import com.structure.utilities.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Type;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})
public class TrialController {

    @Autowired
    TrialRepo tr;

    @Autowired
    TrackingRepo trkr;

    @Autowired
    BenchmarkRepo bmr;

    @Autowired
    private LoginController LC;

    //private final LoginController LC = new LoginController();

    @PostMapping(value = "/api/createTrial")
    public ResponseEntity<?> createTrial(HttpServletRequest req, @RequestParam Map<String, String> body){
        String trialId = Utils.generateUniqueId();
        Trial trial = new Trial(trialId, Integer.parseInt(body.get("trialNumber")), new Date(), body.get("comments"), body.get("benchmarkId"));

        Type listType = new TypeToken<List<Tracking>>() {}.getType();
        List<Tracking> tracks = Utils.gson().fromJson(body.get("tracking"), listType);
        for(Tracking t : tracks){
            setTrackingInfo(t, trialId);
        }
        trial.setTrackings(tracks);
        System.out.println(trial.toString());

        tr.save(trial);

        return LC.getTeacher(req);
    }

    @PostMapping(value = "/api/editTrial")
    public ResponseEntity<?> editTrial(@RequestParam Map<String, String> body, HttpServletRequest req){
        Trial trial = Utils.gson().fromJson(body.get("body"), Trial.class);
        for(Tracking t : trial.getTrackings()){
            if(t.getId() == null)
                setTrackingInfo(t, trial.getId());
        }
        tr.save(trial);
        return LC.getTeacher(req);
    }

    private void setTrackingInfo(Tracking t, String trialId){
        t.setId(Utils.generateUniqueId());
        t.setTrialId(trialId);
        t.setEnabled(1);
    }

}
