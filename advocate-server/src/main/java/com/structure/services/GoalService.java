package com.structure.services;

import java.util.*;

import com.structure.models.Benchmark;
import com.structure.models.DTO.GoalDTO;
import com.structure.models.Goal;
import com.structure.repositories.GoalRepo;
import com.structure.utilities.Utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class GoalService {
  @Autowired
  private GoalRepo goalRepo;

  @Autowired
  private Utils utilService;

  @Autowired
  private LoginService ls;

  public ResponseEntity<?> handleGoalCreation(Goal goal) {
    String goalId = goal.getId().isBlank() ? utilService.generateUniqueId() : goal.getId();
    goal.setId(goalId);
    goal.setEnabled(1);
    populateBenchmarkAttributes(goal.getBenchmarks(), goal);
    goalRepo.save(goal);
    return ResponseEntity.ok(mapGoalToGoalDTO(goal));
  }

  public ResponseEntity<?> handleGoalUpdate(Goal body) {
    return handleGoalCreation(body);
  }

  public ResponseEntity<?> handleGoalCopy(Goal goal) {
    String goalId = utilService.generateUniqueId();
    goal.setId(goalId);
    for (Benchmark bm : goal.getBenchmarks()) {
      bm.setId(utilService.generateUniqueId());
      bm.setGoalId(goalId);
      bm.setComplete(0);
      bm.setMetDate(null);
      bm.setTrials(new ArrayList<>());
    }
    goalRepo.save(goal);
    return ls.handleTeacherRehydration();
  }

  public ResponseEntity<?> handleGoalDeletion(String goalId) {
    goalRepo.hardDeleteGoalById(goalId);
    return ls.handleTeacherRehydration();
  }

  private void populateBenchmarkAttributes(List<Benchmark> benchmarks, Goal goal) {
    for (Benchmark bm : benchmarks) {
      if (bm.getId().isBlank()) {
        bm.setId(utilService.generateUniqueId());
        bm.setGoalId(goal.getId());
        bm.setEnabled(1);
        bm.setTrials(new ArrayList<>());
        goal.getBenchmarkIds().add(bm.getId());
      }
    }
  }

  private GoalDTO mapGoalToGoalDTO(Goal goal){
    GoalDTO dto = new GoalDTO();
    dto.getGoal().put(goal.getId(), goal);
    for(Benchmark bm : goal.getBenchmarks()){
      dto.getBenchmarks().put(bm.getId(), bm);
    }
    return dto;
  }

}
