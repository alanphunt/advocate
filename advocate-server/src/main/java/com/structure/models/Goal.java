package com.structure.models;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.structure.config.DateDeserializer;
import com.structure.constraints.DateConstraint;
import com.structure.constraints.OneOrMoreConstraint;
import com.structure.constraints.RequiredFieldConstraint;
import com.structure.utilities.constants.Error;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.Valid;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.structure.utilities.Constants;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "goals")
@Where(clause = "enabled=1")
public class Goal {

  @Id
  private String id;

  @RequiredFieldConstraint(key = "goal")
  private String goal;

  @Column(name = "goal_name")
  @RequiredFieldConstraint(key = "goalName")
  private String goalName;

  private int enabled, monitor;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = Constants.DATE_FORMAT)
  @Column(name = "start_date")
  @JsonDeserialize(using = DateDeserializer.class)
  @DateConstraint(key = "startDate", allowNull = true)
  private Date startDate;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = Constants.DATE_FORMAT)
  @Column(name = "mastery_date")
  @JsonDeserialize(using = DateDeserializer.class)
  @DateConstraint(key = "masteryDate")
  private Date masteryDate;

  @Column(name = "student_id")
  private String studentId;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = Constants.DATE_FORMAT)
  @Column(name = "completion_date")
  private Date completionDate;

  private int complete;

  @ManyToOne
  @JsonIgnore
  @JoinColumn(name = "student_id", insertable = false, updatable = false)
  private Student student;

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  @OneToMany(mappedBy = "goal", cascade = {CascadeType.ALL})
  @OrderBy("label ASC")
  @Valid
  @OneOrMoreConstraint(key = "benchmarks", message = Error.NO_BENCHMARKS)
  private List<Benchmark> benchmarks = new ArrayList<>();

  @Transient
  private ArrayList<String> benchmarkIds = new ArrayList<>();

  public Goal() {
  }

  public Goal(String id, String goal, String goalName, String studentId, Date startDate, Date masteryDate, int monitor) {
    this.id = id;
    this.goal = goal;
    this.goalName = goalName;
    this.studentId = studentId;
    this.startDate = startDate;
    this.masteryDate = masteryDate;
    this.monitor = monitor;
    this.complete = 0;
    this.enabled = 1;
  }

  public String getGoal() {
    return goal;
  }

  public void setGoal(String goal) {
    this.goal = goal;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getGoalName() {
    return goalName;
  }

  public void setGoalName(String goalName) {
    this.goalName = goalName;
  }

  public int getEnabled() {
    return enabled;
  }

  public void setEnabled(int enabled) {
    this.enabled = enabled;
  }

  public int getMonitor() {
    return monitor;
  }

  public void setMonitor(int monitor) {
    this.monitor = monitor;
  }

  public Date getStartDate() {
    return startDate;
  }

  public void setStartDate(Date startDate) {
    this.startDate = startDate;
  }

  public Date getMasteryDate() {
    return masteryDate;
  }

  public void setMasteryDate(Date masteryDate) {
    this.masteryDate = masteryDate;
  }

  public String getStudentId() {
    return studentId;
  }

  public void setStudentId(String studentId) {
    this.studentId = studentId;
  }

  public void setBenchmarks(List<Benchmark> benchmarks) {
    this.benchmarks = benchmarks;
  }

  public List<Benchmark> getBenchmarks() {
    return benchmarks;
  }

  public int getComplete() {
    return this.complete;
  }

  public void setComplete(int complete) {
    this.complete = complete;
  }

  public Date getCompletionDate() {
    return completionDate;
  }

  public void setCompletionDate(Date completionDate) {
    this.completionDate = completionDate;
  }

  public ArrayList<String> getBenchmarkIds() {
    return benchmarkIds;
  }

  public void setBenchmarkIds(ArrayList<String> benchmarkIds) {
    this.benchmarkIds = benchmarkIds;
  }

  @Override
  public String toString() {
    return "Goal{" +
        "id='" + id + '\'' +
        ", goalName='" + goalName + '\'' +
        ", enabled=" + enabled +
        ", monitor=" + monitor +
        ", startDate=" + startDate +
        ", masteryDate=" + masteryDate +
        ", complete=" + complete +
        ", benchmarkIds=" + benchmarkIds +
        ", benchmarks=" + benchmarks +
        ", studentId='" + studentId + '\'' +
        '}';
  }
}