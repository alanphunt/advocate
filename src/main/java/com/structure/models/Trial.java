package com.structure.models;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "trials", schema = "advocate")
public class Trial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "date_started")
    private Instant dateStarted;
    @Column(name = "trial_length_minutes")
    private int trialLengthMinutes;
    private String comments;
    @Column(name = "tracked_by")
    private int trackedBy;
    @Column(name = "benchmark_id")
    private int benchmarkId;

    private int enabled;

    public Trial (){}

    public Trial(Instant dateStarted, int trialLengthMinutes, String comments, int trackedBy, int benchmarkId) {
        this.dateStarted = dateStarted;
        this.trialLengthMinutes = trialLengthMinutes;
        this.comments = comments;
        this.trackedBy = trackedBy;
        this.benchmarkId = benchmarkId;
        this.enabled = 1;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Instant getDateStarted() {
        return dateStarted;
    }

    public void setDateStarted(Instant dateStarted) {
        this.dateStarted = dateStarted;
    }

    public int getTrialLengthMinutes() {
        return trialLengthMinutes;
    }

    public void setTrialLengthMinutes(int trialLengthMinutes) {
        this.trialLengthMinutes = trialLengthMinutes;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public int getTrackedBy() {
        return trackedBy;
    }

    public void setTrackedBy(int trackedBy) {
        this.trackedBy = trackedBy;
    }

    public int getBenchmarkId() {
        return benchmarkId;
    }

    public void setBenchmarkId(int benchmarkId) {
        this.benchmarkId = benchmarkId;
    }

    public int getEnabled() {
        return enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

    @Override
    public String toString() {
        return "Trial{" +
                "id=" + id +
                ", dateStarted=" + dateStarted +
                ", trialLengthMinutes=" + trialLengthMinutes +
                ", comments='" + comments + '\'' +
                ", trackedBy=" + trackedBy +
                ", benchmarkId=" + benchmarkId +
                ", enabled=" + enabled +
                '}';
    }
}
