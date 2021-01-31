package com.structure.controllers;

import com.structure.repositories.BenchmarkRepo;
import com.structure.repositories.GoalRepo;
import com.structure.services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})
public class BenchmarkController {

    @Autowired
    private BenchmarkRepo bmr;

    @Autowired
    private GoalRepo gr;

    @Autowired
    private LoginService ls;

    @PostMapping(value = "/api/completebenchmark")
    public ResponseEntity<?> completeBenchmark(String benchmarkId, int complete, String goalId){
        boolean incomplete = complete == 0;
        if(!goalId.equals(""))
            gr.updateCompletionStatus(goalId, complete, incomplete ? null : new Date());
        System.out.println(bmr.updateBenchmark(benchmarkId, complete, incomplete ? null : new Date()));
        return ls.handleTeacherRehydration();
    }

}
