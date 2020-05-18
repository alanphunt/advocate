package com.structure.controllers;

import com.google.gson.reflect.TypeToken;
import com.structure.models.Tracking;
import com.structure.models.Trial;
import com.structure.repositories.TrackingRepo;
import com.structure.repositories.TrialRepo;
import com.structure.utilities.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping(value = "/api/createtrial")
    public ResponseEntity<?> createTrial(@RequestParam Map<String, String> body){
        body.forEach((val, ind) -> {
            System.out.println(val);
            System.out.println(ind);
        });

        String trialId = Utils.generateUniqueId();
        Trial trial = new Trial(trialId, new Date(), body.get("comments"), body.get("benchmarkId"));
        tr.save(trial);

        Type listType = new TypeToken<List<Tracking>>() {}.getType();
        List<Tracking> tracks = Utils.gson().fromJson(body.get("tracking"), listType);


        for(Tracking t : tracks){
            t.setId(Utils.generateUniqueId());
            t.setEnabled(1);
            t.setTrialId(trialId);
            System.out.println(t.toString());
            trkr.save(t);
        }

        return ResponseEntity.ok("");
    }
}
