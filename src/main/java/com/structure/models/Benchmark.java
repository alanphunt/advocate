package com.structure.models;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "benchmarks", schema = "advocate")
public class Benchmark {

    @Id
    private String id;

    private int enabled;

    private String label;

    @Column(name = "met_date")
    private Date metDate;

    @Column(name = "goal_id")
    private String goalId;

    @Column(name = "trial_count")
    private int trialCount;

    public Benchmark() {
    }

    public Benchmark(String label, String goalId){
        this.label = label;
        this.goalId = goalId;
        this.enabled = 1;
        this.trialCount = 0;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public Date getMetDate() {
        return metDate;
    }

    public void setMetDate(Date metDate) {
        this.metDate = metDate;
    }

    public String getGoalId() {
        return goalId;
    }

    public void setGoalId(String goalId) {
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
