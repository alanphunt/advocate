package com.structure.controllers;

import com.structure.models.Benchmark;
import com.structure.repositories.BenchmarkRepo;
import com.structure.repositories.GoalRepo;
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
    BenchmarkRepo bmr;

    @Autowired
    GoalRepo gr;

    @Autowired
    private LoginController LC;

    //private final LoginController LC = new LoginController();

    @PostMapping(value = "/api/completeBenchmark")
    public ResponseEntity<?> completeBenchmark(String benchmarkId, int complete, String goalId, HttpServletRequest req){
        boolean incomplete = complete == 0;
        if(!goalId.equals(""))
            gr.updateCompletionStatus(goalId, complete, incomplete ? null : new Date());

        System.out.println(bmr.updateBenchmark(benchmarkId, complete, incomplete ? null : new Date()));

        return LC.getTeacher(req);
    }

    @PostMapping(value = "/api/editBenchmark")
    public ResponseEntity<?> editBenchmark(HttpServletRequest req, @RequestParam Map<String, String> body){
        bmr.save(Utils.gson().fromJson(body.get("body"), Benchmark.class));
        return LC.getTeacher(req);
    }

    @PostMapping(value = "/api/deleteBenchmark")
    public ResponseEntity<?> deleteBenchmark(HttpServletRequest req, @RequestParam Map<String, String> body){

        bmr.delete(Utils.gson().fromJson(body.get("body"), Benchmark.class));
        return LC.getTeacher(req);
    }

}
