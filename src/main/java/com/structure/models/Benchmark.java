package com.structure.models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "benchmarks")
@Where(clause = "enabled=1")
public class Benchmark {

    @Id
    @Expose
    private String id;

    @Expose
    @Column(name = "goal_id")
    private String goalId;

    @ManyToOne
    @JoinColumn(name = "goal_id", insertable = false, updatable = false)
    private Goal goal;

    @Expose
    private int enabled, complete;

    @Expose
    private String label;

    @Expose
    private String description;

    @Expose
    private String tracking;

    @Expose
    @Column(name = "mastery_date")
    private Date masteryDate;

    @Expose
    @Column(name = "met_date")
    private Date metDate;

    @OneToMany(mappedBy = "benchmark", cascade = CascadeType.ALL, orphanRemoval = true)
    @Expose
    @OrderBy("trialNumber ASC")
    private List<Trial> trials;

    public List<Trial> getTrials() {
        return trials;
    }

    public void setTrials(List<Trial> trials) {
        this.trials = trials;
    }

    public Benchmark() {
    }

    public Benchmark(String id, String label, String description, String goalId, String tracking){
        this.id = id;
        this.label = label;
        this.description = description;
        this.goalId = goalId;
        this.tracking = tracking;
        this.complete = 0;
        this.enabled = 1;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getGoalId() {
        return goalId;
    }

    public void setGoalId(String goalId) {
        this.goalId = goalId;
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

    public Date getMasteryDate() {
        return masteryDate;
    }

    public void setMasteryDate(Date masteryDate) {
        this.masteryDate = masteryDate;
    }

    public Date getMetDate() {
        return metDate;
    }

    public void setMetDate(Date metDate) {
        this.metDate = metDate;
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
                "id='" + id + '\'' +
                ", goalId='" + goalId + '\'' +
                ", enabled=" + enabled +
                ", label='" + label + '\'' +
                ", description='" + description + '\'' +
                ", tracking='" + tracking + '\'' +
                ", masteryDate=" + masteryDate +
                ", metDate=" + metDate +
                ", complete=" + complete +
                '}';
    }
}