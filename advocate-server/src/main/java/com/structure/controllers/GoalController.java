package com.structure.controllers;

import com.structure.models.Goal;
import com.structure.services.GoalService;
import com.structure.utilities.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import java.text.ParseException;
import java.util.*;

@RestController
@RequestMapping(path=Constants.API_PATH, method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class GoalController {

    @Autowired
    private GoalService goalService;

    /*
        We keep the payload as a Map so that we can test each individual value. If you try to send the payload
        as a whole object then you can't determine what value throws an error during deserialization. I just spent
        2 hours trying to redo this, so don't think you can make the process more efficient.
     */
    @PostMapping(value = "/creategoal")
    public ResponseEntity<?>createGoal(@RequestParam Map<String, String> body) throws ParseException {
        return goalService.handleGoalCreation(body);
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
        return goalService.handleGoalDeletion(goalId);

    }

    @PostMapping(value = "/editgoal")
    public ResponseEntity<?> editGoal(@RequestParam Map<String, String> body){
        return goalService.handleGoalUpdate(body);
    }

    @PostMapping(value = "/copygoal")
    public ResponseEntity<?> copygoal(@RequestBody Goal goal){
        return goalService.handleGoalCopy(goal);
    }
}
