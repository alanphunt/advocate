package com.structure.controllers;

import com.structure.repositories.BenchmarkRepo;
import com.structure.repositories.GoalRepo;
import com.structure.utilities.JWTUtil;
import com.structure.utilities.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@RestController
@RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})
public class BenchmarkController {

    @Autowired
    BenchmarkRepo bmr;

    @Autowired
    GoalRepo gr;

    @Autowired
    LoginRegistration lr;

    @PostMapping(value = "/api/completeBenchmark")
    public ResponseEntity<?> completeBenchmark(String benchmarkId, int complete, String goalId, HttpServletRequest req){
        boolean incomplete = complete == 0;
        Utils.paramMap(req);
        if(!goalId.equals(""))
            gr.updateCompletionStatus(goalId, complete, incomplete ? null : new Date());

        System.out.println(bmr.updateBenchmark(benchmarkId, complete, incomplete ? null : new Date()));

        return lr.getTeacher(req);
    }


}
