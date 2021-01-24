package com.structure.controllers;

import com.structure.models.Benchmark;
import com.structure.repositories.BenchmarkRepo;
import com.structure.repositories.GoalRepo;
import com.structure.services.LoginService;
import com.structure.utilities.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})
public class BenchmarkController {

    @Autowired
    private BenchmarkRepo bmr;

    @Autowired
    private GoalRepo gr;

    @Autowired
    private LoginService ls;

    @Autowired
    private Utils utils;

    @PostMapping(value = "/api/completeBenchmark")
    public ResponseEntity<?> completeBenchmark(String benchmarkId, int complete, String goalId, HttpServletRequest req){
        boolean incomplete = complete == 0;
        if(!goalId.equals(""))
            gr.updateCompletionStatus(goalId, complete, incomplete ? null : new Date());
        System.out.println(bmr.updateBenchmark(benchmarkId, complete, incomplete ? null : new Date()));
        return ls.handleTeacherRehydration();
    }

    @PostMapping(value = "/api/editBenchmark")
    public ResponseEntity<?> editBenchmark(HttpServletRequest req, @RequestParam Map<String, String> body){
        bmr.save(utils.gson().fromJson(body.get("body"), Benchmark.class));
        return ls.handleTeacherRehydration();
    }

    @PostMapping(value = "/api/deleteBenchmark")
    public ResponseEntity<?> deleteBenchmark(HttpServletRequest req, @RequestParam Map<String, String> body){
        bmr.delete(utils.gson().fromJson(body.get("body"), Benchmark.class));
        return ls.handleTeacherRehydration();
    }

}
