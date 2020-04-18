package com.structure.models;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "trials", schema = "advocate")
public class Trial {

    @Id
    private String id;
    @Column(name = "date_started")
    private Date dateStarted;
    @Column(name = "trial_length_minutes")
    private int trialLengthMinutes;
    private String comments;
    @Column(name = "tracked_by")
    private String trackedBy;
    @Column(name = "benchmark_id")
    private String benchmarkId;

    private int enabled;

    public Trial (){}

    public Trial(Date dateStarted, int trialLengthMinutes, String comments, String trackedBy, String benchmarkId) {
        this.dateStarted = dateStarted;
        this.trialLengthMinutes = trialLengthMinutes;
        this.comments = comments;
        this.trackedBy = trackedBy;
        this.benchmarkId = benchmarkId;
        this.enabled = 1;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getDateStarted() {
        return dateStarted;
    }

    public void setDateStarted(Date dateStarted) {
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

    public String getTrackedBy() {
        return trackedBy;
    }

    public void setTrackedBy(String trackedBy) {
        this.trackedBy = trackedBy;
    }

    public String getBenchmarkId() {
        return benchmarkId;
    }

    public void setBenchmarkId(String benchmarkId) {
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
