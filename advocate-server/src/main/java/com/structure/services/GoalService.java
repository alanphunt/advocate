package com.structure.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.structure.models.Benchmark;
import com.structure.repositories.GoalRepo;
import com.structure.utilities.Constants;
import com.structure.utilities.Utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoalService {
    @Autowired
    GoalRepo goalRepo;

    @Autowired
    private Utils utilService;

    private Map<String, String> determineGoalCreationErrors(Map<String, String> body){
        Map<String, String> errors = new HashMap<>();
        List<Benchmark> benchmarks = null;

        try {
            benchmarks = utilService.gson().fromJson(body.get("benchmarks"), utilService.getListType(Benchmark.class));
            if(benchmarks != null)
                for (Benchmark bm : benchmarks) {
                    if(bm.getDescription().isBlank()
                            || bm.getTracking().isBlank()
                            || bm.getMasteryDate() == null
                    ) {
                        //errors.put("benchmarks", Constants.BENCHMARKS_EMPTY_RESPONSE);
                        throw new Exception("");
                    }
                }
        }catch(Exception e){
            errors.put("benchmarks", Constants.BENCHMARKS_EMPTY_RESPONSE);
        }

        for (String key : body.keySet()){
            String val = body.get(key);
            if(key.equals("masteryDate") && !val.matches(Constants.DATE_REGEX))
                errors.put(key, Constants.INVALID_DATE_FORMAT);
            else if(key.equals("startDate") && (!val.isBlank() || !val.matches(Constants.DATE_REGEX)))
                errors.put(key, Constants.INVALID_DATE_FORMAT);
            else if(val.isBlank() && !key.equals("process"))
                errors.put(key, Constants.EMPTY_FIELD_RESPONSE);
        }


        return errors;
    }
}
