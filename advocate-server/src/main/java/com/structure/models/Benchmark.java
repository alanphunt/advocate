package com.structure.models;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.structure.config.DateDeserializer;
import com.structure.constraints.DateConstraint;
import com.structure.constraints.RequiredFieldConstraint;
import com.structure.utilities.constants.Error;
import org.hibernate.annotations.Where;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.structure.utilities.Constants;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "benchmarks")
@Where(clause = "enabled=1")
public class Benchmark {

    @Id
    private String id;

    @Column(name = "goal_id")
    private String goalId;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "goal_id", insertable = false, updatable = false)
    private Goal goal;

    private int enabled, complete;

    private String label;

    @RequiredFieldConstraint(key = "benchmarks", message = Error.BENCHMARK_FIELD_EMPTY)
    private String description, tracking;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = Constants.DATE_FORMAT)
    @Column(name = "mastery_date")
    @JsonDeserialize(using = DateDeserializer.class)
    @DateConstraint(key = "benchmarks")
    private Date masteryDate;

    @Column(name = "met_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = Constants.DATE_FORMAT)
    private Date metDate;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OneToMany(mappedBy = "benchmark", cascade = {CascadeType.ALL})
    @OrderBy("trialNumber ASC")
    private List<Trial> trials = new ArrayList<>();

    @Transient
    private ArrayList<String> trialIds = new ArrayList<>();

    @Column(name = "trial_average")
    private double trialAverage;

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

    public ArrayList<String> getTrialIds() {
        return trialIds;
    }

    public void setTrialIds(ArrayList<String> trialIds) {
        this.trialIds = trialIds;
    }

    public double getTrialAverage() {
        return trialAverage;
    }

    public void setTrialAverage(double trialAverage) {
        this.trialAverage = trialAverage;
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
                ", trialIds=" + trialIds +
                ", complete=" + complete +
                ", trialAverage=" + trialAverage +
                '}';
    }
}