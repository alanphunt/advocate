package com.structure.models;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "benchmarks", schema = "advocate")
public class Benchmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int enabled;

    private String label;

    @Column(name = "met_date")
    private Instant metDate;

    @Column(name = "goal_id")
    private int goalId;

    @Column(name = "trial_count")
    private int trialCount;

    public Benchmark() {
    }

    public Benchmark(String label, int goalId){
        this.label = label;
        this.goalId = goalId;
        this.enabled = 1;
        this.trialCount = 0;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getEnabled() {
        return enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Instant getMetDate() {
        return metDate;
    }

    public void setMetDate(Instant metDate) {
        this.metDate = metDate;
    }

    public int getGoalId() {
        return goalId;
    }

    public void setGoalId(int goalId) {
        this.goalId = goalId;
    }

    public int getTrialCount() {
        return trialCount;
    }

    public void setTrialCount(int trialCount) {
        this.trialCount = trialCount;
    }

    @Override
    public String toString() {
        return "Benchmark{" +
                "id=" + id +
                ", enabled=" + enabled +
                ", label='" + label + '\'' +
                ", metDate=" + metDate +
                ", goalId=" + goalId +
                ", trialCount=" + trialCount +
                '}';
    }

    public int increaseCount(){
       return this.trialCount++;
    }
}
