package com.structure.models;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "goals", schema = "advocate")
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "goal_name")
    private String goalName;
    @Column(name = "trial_count")
    private int trialCount;
    @Column(name = "start_date")
    private Instant startDate;
    @Column(name = "master_date")
    private Instant masteryDate;
    //each goal will have a minimum of 3 benchmarks
    @Column(name = "benchmark_count")
    private int benchmarkCount;
    private boolean monitor;
    private String process;

    //dropdown menu
    @Column(name = "goal_tracking")
    private String goalTracking;

    private int enabled;
    @Column(name = "student_id")
    private int studentId;

    public Goal(){}

    public Goal(int trialCount, Instant startDate, boolean monitor, String process, String goalTracking, int studentId) {
        this.trialCount = trialCount;
        this.startDate = startDate;
        this.monitor = monitor;
        this.process = process;
        this.goalTracking = goalTracking;
        this.studentId = studentId;
        this.enabled = 1;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getTrialCount() {
        return trialCount;
    }

    public void setTrialCount(int trialCount) {
        this.trialCount = trialCount;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getMasteryDate() {
        return masteryDate;
    }

    public void setMasteryDate(Instant masteryDate) {
        this.masteryDate = masteryDate;
    }

    public int getBenchmarkCount() {
        return benchmarkCount;
    }

    public void setBenchmarkCount(int benchmarkCount) {
        this.benchmarkCount = benchmarkCount;
    }

    public boolean getMonitor() {
        return monitor;
    }

    public void setMonitor(boolean monitor) {
        this.monitor = monitor;
    }

    public String getProcess() {
        return process;
    }

    public void setProcess(String process) {
        this.process = process;
    }

    public String getGoalTracking() {
        return goalTracking;
    }

    public void setGoalTracking(String goalTracking) {
        this.goalTracking = goalTracking;
    }

    public int getEnabled() {
        return enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    @Override
    public String toString() {
        return "Goal{" +
                "id=" + id +
                ", trialCount=" + trialCount +
                ", startDate=" + startDate +
                ", masteryDate=" + masteryDate +
                ", benchmarkCount=" + benchmarkCount +
                ", monitor=" + monitor +
                ", process='" + process + '\'' +
                ", goalTracking='" + goalTracking + '\'' +
                ", enabled=" + enabled +
                ", studentId=" + studentId +
                '}';
    }
}
