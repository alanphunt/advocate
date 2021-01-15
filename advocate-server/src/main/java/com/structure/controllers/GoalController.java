package com.structure.controllers;

import com.structure.models.Benchmark;
import com.structure.models.Goal;
import com.structure.models.Trial;
import com.structure.repositories.BenchmarkRepo;
import com.structure.repositories.GoalRepo;
import com.structure.repositories.TrackingRepo;
import com.structure.repositories.TrialRepo;
import com.structure.utilities.Constants;
import com.structure.utilities.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path=Constants.API_PATH, method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
public class GoalController {

    @Autowired
    GoalRepo gr;

    @Autowired
    BenchmarkRepo bmr;

    @Autowired
    TrialRepo tr;

    @Autowired
    TrackingRepo trk;

    @Autowired
    private LoginController LC;

    @PostMapping(value = "/creategoal")
    public ResponseEntity<?>createGoal(@RequestParam Map<String, String> body, HttpServletRequest req) throws ParseException {
        List<Benchmark> bms = Utils.gson().fromJson(body.get("benchmarks"), Utils.getListType(Benchmark.class));
        Map<String, String> errors = determineGoalCreationErrors(body, bms);

        if(errors.size() == 0) {
            String goalId = Utils.generateUniqueId();
            SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yy");

            Date potentialStartDate = null;
            try{
                System.out.println("trying to parse");
                potentialStartDate = sdf.parse(body.get("startDate"));
            }catch(Exception e){
                System.out.println(e.getMessage());
            }
            System.out.println("moving on..");
            Goal goal = new Goal(
                    goalId,
                    body.get("goal"),
                    body.get("goalName"),
                    body.get("studentId"),
                    potentialStartDate,
                    sdf.parse(body.get("masteryDate")),
                    (body.get("monitor").equals("true") ? 1 : 0)
            );

            for (Benchmark bm : bms) {
                bm.setId(Utils.generateUniqueId());
                bm.setGoalId(goalId);
                bm.setTrials(new ArrayList<Trial>());
                bm.setEnabled(1);
            }
            goal.setBenchmarks(bms);
            gr.save(goal);
            return LC.getTeacher(req);
        }

        return ResponseEntity.badRequest().body(Utils.gson().toJson(errors));
    }

    @DeleteMapping(value = "/deletegoal")
    public ResponseEntity<?> deleteGoal(HttpServletRequest req, /* @RequestParam Map<String, String> body */String goalId){
 /*     for soft deletion
        String regex = ",";
        String goalId = body.get("goalId");
        String [] benchmarkIds = body.get("benchmarkIds").split(regex, 0);
        String [] trialIds = body.get("trialIds").split(regex, 0);

        gr.softDeleteGoalById(goalId);
        bmr.softDeleteAllBenchmarksByGoalId(goalId);
        for(String id : benchmarkIds){
            tr.softDeleteAllByBenchmarkId(id);
        }
        for(String id : trialIds){
            trk.softDeleteAllByTrialId(id);
        }*/

        //hard deletion, removes all orphans
        gr.deleteById(goalId);
        return LC.getTeacher(req);
    }

    @PostMapping(value = "/editgoal")
    public ResponseEntity<?> editGoal(HttpServletRequest req, @RequestParam Map<String, String> body){
        Goal goal = Utils.gson().fromJson(body.get("body"), Goal.class);
        for(Benchmark bm : goal.getBenchmarks()){
            if(bm.getId() == null) {
                bm.setId(Utils.generateUniqueId());
                bm.setGoalId(goal.getId());
                bm.setEnabled(1);
                bm.setTrials(new ArrayList<Trial>());
            }
        }
        gr.save(goal);
        return LC.getTeacher(req);
    }

    private Map<String, String> determineGoalCreationErrors(Map<String, String> body, List<Benchmark> benchmarks){
        Map<String, String> errors = new HashMap<>();
        if(benchmarks.isEmpty())
            errors.put("benchmarks", Constants.NO_BENCHMARKS_RESPONSE);
        else
            try {
                for (Benchmark bm : benchmarks) {
                    if(Utils.richTextFieldIsEmpty(bm.getDescription())
                            || bm.getTracking().isBlank()
                            || bm.getMasteryDate() == null
                    ) 
                        throw new Exception("");
                }
            }catch(Exception e){
                errors.put("benchmarks", Constants.BENCHMARKS_EMPTY_RESPONSE);
            }

        for (String key : body.keySet()){
            if(key.equals("goal") && Utils.richTextFieldIsEmpty(body.get(key)))
                errors.put(key, Constants.EMPTY_FIELD_RESPONSE);
            else if(key.equals("masteryDate") && !body.get(key).matches(Constants.DATE_REGEX))
                errors.put(key, Constants.INVALID_DATE_FORMAT);
            else if(key.equals("startDate") && !body.get(key).isBlank() && !body.get(key).matches(Constants.DATE_REGEX))
                errors.put(key, Constants.INVALID_DATE_FORMAT);
            else if(body.get(key).isBlank() && !key.equals("startDate"))
                errors.put(key, Constants.EMPTY_FIELD_RESPONSE);
        }


        return errors;
    }

}
