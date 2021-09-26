package com.structure.models.DTO;

import com.structure.models.Benchmark;
import com.structure.models.Goal;

import java.util.HashMap;
import java.util.Map;

public class GoalDTO {
  private Map<String, Goal> goal;
  private Map<String, Benchmark> benchmarks;

  public GoalDTO(){
    this.goal = new HashMap<>();
    this.benchmarks = new HashMap<>();
  }

  public Map<String, Goal> getGoal() {
    return goal;
  }

  public void setGoal(Map<String, Goal> goal) {
    this.goal = goal;
  }

  public Map<String, Benchmark> getBenchmarks() {
    return benchmarks;
  }

  public void setBenchmarks(Map<String, Benchmark> benchmarks) {
    this.benchmarks = benchmarks;
  }

  @Override
  public String toString() {
    return "GoalDTO{" +
        "goal=" + goal +
        ", benchmarks=" + benchmarks +
        '}';
  }
}
