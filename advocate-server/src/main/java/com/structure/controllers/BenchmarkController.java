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
    private BenchmarkRepo bmr;

    @Autowired
    private GoalRepo gr;

    @Autowired
    private LoginController LC;
<<<<<<< HEAD:advocate-server/src/main/java/com/structure/controllers/BenchmarkController.java
=======

    //private final LoginController LC = new LoginController();
>>>>>>> a95f801ec3a4c1b1baef8efb874e845b688000e5:src/main/java/com/structure/controllers/BenchmarkController.java

    @PostMapping(value = "/api/completeBenchmark")
    public ResponseEntity<?> completeBenchmark(String benchmarkId, int complete, String goalId, HttpServletRequest req){
        boolean incomplete = complete == 0;
        if(!goalId.equals(""))
            gr.updateCompletionStatus(goalId, complete, incomplete ? null : new Date());
        System.out.println(bmr.updateBenchmark(benchmarkId, complete, incomplete ? null : new Date()));
<<<<<<< HEAD:advocate-server/src/main/java/com/structure/controllers/BenchmarkController.java
=======

>>>>>>> a95f801ec3a4c1b1baef8efb874e845b688000e5:src/main/java/com/structure/controllers/BenchmarkController.java
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
