package com.structure.services;

import java.text.SimpleDateFormat;
import java.util.*;

import com.fasterxml.jackson.core.type.TypeReference;
import com.structure.models.Benchmark;
import com.structure.models.Goal;
import com.structure.repositories.GoalRepo;
import com.structure.utilities.Constants;
import com.structure.utilities.Utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class GoalService {
    @Autowired
    GoalRepo goalRepo;

    @Autowired
    private Utils utilService;

    @Autowired
    private LoginService ls;

    public ResponseEntity<?> handleGoalCreation(Map<String, String> goalString){
        Map<String, String> errors = new HashMap<>();
        ArrayList<Benchmark> benchmarks = attemptToDeserializeBenchmarks(goalString.get("benchmarks"), errors);

        determineGoalCreationErrors(errors, benchmarks, goalString);

        if(errors.size() == 0) {
            String goalId = (goalString.get("id") == null ? utilService.generateUniqueId() : goalString.get("id"));
            SimpleDateFormat sdf = new SimpleDateFormat(Constants.DATE_FORMAT);
            Date potentialStartDate = null, potentialMasteryDate = null;

            try{
                potentialMasteryDate = sdf.parse(goalString.get("masteryDate"));
                potentialStartDate = sdf.parse(goalString.get("startDate"));
            }catch(Exception e){
                System.out.println(e.getMessage());
            }

            Goal goal = new Goal(
                    goalId,
                    goalString.get("goal"),
                    goalString.get("goalName"),
                    goalString.get("studentId"),
                    potentialStartDate,
                    potentialMasteryDate,
                    (goalString.get("monitor").equals("true") ? 1 : 0)
            );

            assert benchmarks != null;
            populateBenchmarkAttributes(benchmarks, goalId);
            goal.setBenchmarks(benchmarks);
            goalRepo.save(goal);
            return ls.handleTeacherRehydration();

        }

        return ResponseEntity.badRequest().body(errors);

    }


    public ResponseEntity<?> handleGoalUpdate(Map<String, String> body){
        return handleGoalCreation(body);
/*        Map<String, String> errors = new HashMap<>();
        ArrayList<Benchmark> benchmarks = attemptToDeserializeBenchmarks(body.get("benchmarks"), errors);

        determineGoalCreationErrors(errors, benchmarks, body);

        try{
            potentialMasteryDate = sdf.parse(goalString.get("masteryDate"));
            potentialStartDate = sdf.parse(goalString.get("startDate"));
        }catch(Exception e){
            System.out.println(e.getMessage());
        }

        if(errors.size() == 0){
            Goal goal = new Goal(
                    body.get("id"),
                    body.get("goal"),
                    body.get("goalName"),
                    body.get("studentId"),
                    body.get("startDate"),
                    body.get("masteryDate"),
                    (body.get("monitor").equals("true") ? 1 : 0)
            );
            populateBenchmarkAttributes(benchmarks, goalId);

        }
        return ResponseEntity.badRequest().body(errors);*/
    }

    private void determineGoalCreationErrors(Map<String, String> errors, ArrayList<Benchmark> benchmarks, Map<String, String> goalString){
        try {
            for (Benchmark bm : benchmarks) {
                if(utilService.richTextFieldIsEmpty(bm.getDescription())
                        || bm.getTracking().isBlank()
                        || bm.getMasteryDate() == null
                ) {
                    throw new Exception("");
                }
            }
        }catch(Exception e){
            errors.put("benchmarks", Constants.BENCHMARKS_EMPTY_RESPONSE);
        }
        if(benchmarks.size() == 0)
            errors.put("benchmarks", Constants.NO_BENCHMARKS_RESPONSE);

        for (String key : goalString.keySet()){
            String val = goalString.get(key);
            if(key.equals("masteryDate") && !val.matches(Constants.DATE_REGEX))
                errors.put(key, Constants.INVALID_DATE_FORMAT);
            else if(key.equals("startDate") && (!val.isBlank() && !val.matches(Constants.DATE_REGEX)))
                errors.put(key, Constants.INVALID_DATE_FORMAT);
            else if(val.isBlank() && !key.equals("process") && !key.equals("benchmarks") && !key.equals("startDate"))
                errors.put(key, Constants.EMPTY_FIELD_RESPONSE);
        }
    }

    private ArrayList<Benchmark> attemptToDeserializeBenchmarks(String benchmarkString, Map<String, String> errors){
        try{
            return utilService.fromJSON(new TypeReference<>() {}, benchmarkString);
        }catch(Exception e){
            errors.put("benchmarks", Constants.BENCHMARKS_EMPTY_RESPONSE);
            return null;
        }
    }

    private void populateBenchmarkAttributes(ArrayList<Benchmark> benchmarks, String goalId){
        for(Benchmark bm : benchmarks){
            if(bm.getId() == null) {
                bm.setId(utilService.generateUniqueId());
                bm.setGoalId(goalId);
                bm.setEnabled(1);
                bm.setTrials(new ArrayList<>());
            }
        }
    }
}
