package com.structure.models;

import com.google.gson.annotations.Expose;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "benchmarks")
public class Benchmark {

    @Id
    @Expose
    private String id;

    @Expose
    private int enabled;

    @Expose
    private String label;

    @Expose
    private String description;

    @Expose
    @Column(name = "met_date")
    private Date metDate;

    @Expose
    @Column(name = "mastery_date")
    private Date masteryDate;

    @ManyToOne
    @JoinColumn(name = "goal_id", insertable = false, updatable = false)
    private Goal goal;

    @Expose
    @Column(name = "goal_id")
    private String goalId;

    @Expose
    private String tracking;

    @Expose
    private int complete;

    public Benchmark() {
    }

    public Benchmark(String label, String description, String goalId, String tracking, Date masteryDate){
        this.label = label;
        this.description = description;
        this.goalId = goalId;
        this.tracking = tracking;
        this.masteryDate = masteryDate;
        this.enabled = 1;
        this.complete = 0;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getMasteryDate() {
        return masteryDate;
    }

    public void setMasteryDate(Date masteryDate) {
        this.masteryDate = masteryDate;
    }

    public String getTracking() {
        return tracking;
    }

    public void setTracking(String tracking) {
        this.tracking = tracking;
    }

    public int getComplete() {
        return complete;
    }

    public void setComplete(int complete) {
        this.complete = complete;
    }

    @Override
    public String toString() {
        return "Benchmark{" +
                "id=" + id +
                ", enabled=" + enabled +
                ", label='" + label + '\'' +
                ", metDate=" + metDate +
                ", goalId=" + goalId +
                ", masteryDate=" + masteryDate +
                ", description=" + description +
                ", tracking=" + tracking +
                ", complete=" + complete +
                '}';
    }

}
