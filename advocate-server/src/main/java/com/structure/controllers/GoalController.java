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
        Map<String, String> errors = determineGoalCreationErrors(body);

        if(errors.size() == 0) {
            String goalId = Utils.generateUniqueId();
            SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
            Goal goal = new Goal(
                    goalId,
                    body.get("goal"),
                    body.get("goalName"),
                    body.get("process"),
                    body.get("studentId"),
                    sdf.parse(body.get("startDate")),
                    sdf.parse(body.get("masteryDate")),
                    (body.get("monitor").equals("true") ? 1 : 0)
            );

            List<Benchmark> bms = Utils.gson().fromJson(body.get("benchmarks"), Utils.getListType(Benchmark.class));

            for (Benchmark bm : bms) {
                bm.setId(Utils.generateUniqueId());
                bm.setGoalId(goalId);
                bm.setEnabled(1);
            }
            goal.setBenchmarks(bms);
            gr.save(goal);
            return LC.getTeacher(req);
        }

        return ResponseEntity.badRequest().body(Utils.gson().toJson(errors));
    }

    @DeleteMapping(value = "/deleteGoal")
    public ResponseEntity<?> deleteGoal(HttpServletRequest req, @RequestParam Map<String, String> body){
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
        Goal goal = Utils.gson().fromJson(body.get("goal"), Goal.class);
        gr.delete(goal);
        return LC.getTeacher(req);
    }

    @PostMapping(value = "/editGoal")
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

    private Map<String, String> determineGoalCreationErrors(Map<String, String> body){
        Map<String, String> errors = new HashMap<>();
        List<Benchmark> benchmarks = null;

        try {
            benchmarks = Utils.gson().fromJson(body.get("benchmarks"),  Utils.getListType(Benchmark.class));
            if(benchmarks != null)
                for (Benchmark bm : benchmarks) {
                    if(bm.getLabel().isBlank()
                            || bm.getDescription().isBlank()
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
            if(key.toLowerCase().contains("date") && !body.get(key).matches(Constants.DATE_REGEX))
                errors.put(key, Constants.INVALID_DATE_FORMAT);
            else if(body.get(key).isBlank())
                errors.put(key, Constants.EMPTY_FIELD_RESPONSE);
        }


        return errors;
    }

}
