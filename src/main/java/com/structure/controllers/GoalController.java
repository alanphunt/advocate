package com.structure.controllers;

import com.google.gson.reflect.TypeToken;
import com.structure.models.Benchmark;
import com.structure.models.Goal;
import com.structure.repositories.BenchmarkRepo;
import com.structure.repositories.GoalRepo;
import com.structure.utilities.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Type;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})
public class GoalController {

    @Autowired
    GoalRepo gr;

    @Autowired
    BenchmarkRepo bmr;

    @PostMapping(value = "/api/creategoal")
    public ResponseEntity<?>createGoal(HttpServletRequest request, @RequestParam Map<String, String> body) throws ParseException {

        String goalId = Utils.generateUniqueId();
        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");

        Goal goal = new Goal(
                goalId,
                body.get("goalName"),
                body.get("process"),
                body.get("studentId"),
                sdf.parse(body.get("startDate")),
                sdf.parse(body.get("masteryDate")),
                (body.get("monitor").equals("true") ? 1 : 0)
        );
        System.out.println(goal.toString());
        gr.save(goal);

        Type listType = new TypeToken<List<Benchmark>>() {}.getType();
        List<Benchmark> bms = Utils.gson().fromJson(body.get("benchmarks"), listType);

        //saving the benchmarks
        for (Benchmark bm : bms) {
            bm.setId(Utils.generateUniqueId());
            bm.setGoalId(goalId);
            bm.setEnabled(1);
            bmr.save(bm);
        }

        return ResponseEntity.ok("");
    }
}
