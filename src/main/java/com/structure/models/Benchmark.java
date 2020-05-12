package com.structure.models;

import com.google.gson.annotations.Expose;

import javax.persistence.*;

@Entity
@Table(name = "benchmarks")
public class Benchmark {

    @Id
    @Expose
    private String id;

    @Expose
    @Column(name = "goal_id")
    private String goalId;

    @Expose
    private int enabled;

    @Expose
    private String label;

    @Expose
    private String description;

    @Expose
    private String tracking;

    public Benchmark() {
    }

    public Benchmark(String id, String label, String description, String goalId, String tracking){
        this.id = id;
        this.label = label;
        this.description = description;
        this.goalId = goalId;
        this.tracking = tracking;
        this.enabled = 1;
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

    public String getGoalId() {
        return goalId;
    }

    public void setGoalId(String goalId) {
        this.goalId = goalId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTracking() {
        return tracking;
    }

    public void setTracking(String tracking) {
        this.tracking = tracking;
    }

    @Override
    public String toString() {
        return "Benchmark{" +
                "id=" + id +
                ", enabled=" + enabled +
                ", label=" + label +
                ", goalId=" + goalId +
                ", description=" + description +
                ", tracking=" + tracking +
                '}';
    }

}
