package com.structure.controllers;

import com.google.gson.reflect.TypeToken;
import com.structure.models.Benchmark;
import com.structure.models.Goal;
import com.structure.models.Trial;
import com.structure.repositories.BenchmarkRepo;
import com.structure.repositories.GoalRepo;
import com.structure.repositories.TrackingRepo;
import com.structure.repositories.TrialRepo;
import com.structure.utilities.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Type;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})
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
    LoginRegistration lr;

    @PostMapping(value = "/api/creategoal")
    public ResponseEntity<?>createGoal(@RequestParam Map<String, String> body) throws ParseException {
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

        Type listType = new TypeToken<List<Benchmark>>() {}.getType();
        List<Benchmark> bms = Utils.gson().fromJson(body.get("benchmarks"), listType);

        for (Benchmark bm : bms) {
            bm.setId(Utils.generateUniqueId());
            bm.setGoalId(goalId);
            bm.setEnabled(1);
        }
        goal.setBenchmarks(bms);
        gr.save(goal);
        return ResponseEntity.ok("");
    }

    @PostMapping(value = "/api/deleteGoal")
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
        return lr.getTeacher(req);
    }

    @PostMapping(value = "/api/editGoal")
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
        return lr.getTeacher(req);
    }
}
