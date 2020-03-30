package com.structure.models;

import javax.persistence.*;

@Entity
@Table(name = "trackings", schema = "advocate")
public class Tracking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int frequency;
    @Column(name = "cue_count")
    private int cueCount;
    @Column(name = "permanent_product")
    private String permanentProduct;
    @Column(name = "duration_in_seconds")
    private int durationInSeconds;
    @Column(name = "accuracy_percentage")
    private double accuracyPercentage;
    @Column(name = "trial_id")
    private int trialId;
    private int enabled;

    public Tracking(){}
    //properties of a trial
    public Tracking(int frequency, int cueCount, String permanentProduct, int durationInSeconds, double accuracyPercentage, int trialId) {
        this.frequency = frequency;
        this.cueCount = cueCount;
        this.permanentProduct = permanentProduct;
        this.durationInSeconds = durationInSeconds;
        this.accuracyPercentage = accuracyPercentage;
        this.trialId = trialId;
        this.enabled = 1;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getFrequency() {
        return frequency;
    }

    public void setFrequency(int frequency) {
        this.frequency = frequency;
    }

    public int getCueCount() {
        return cueCount;
    }

    public void setCueCount(int cueCount) {
        this.cueCount = cueCount;
    }

    public String getPermanentProduct() {
        return permanentProduct;
    }

    public void setPermanentProduct(String permanentProduct) {
        this.permanentProduct = permanentProduct;
    }

    public int getDurationInSeconds() {
        return durationInSeconds;
    }

    public void setDurationInSeconds(int durationInSeconds) {
        this.durationInSeconds = durationInSeconds;
    }

    public double getAccuracyPercentage() {
        return accuracyPercentage;
    }

    public void setAccuracyPercentage(double accuracyPercentage) {
        this.accuracyPercentage = accuracyPercentage;
    }

    public int getTrialId() {
        return trialId;
    }

    public void setTrialId(int trialId) {
        this.trialId = trialId;
    }

    public int getEnabled() {
        return enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

    @Override
    public String toString() {
        return "Tracking{" +
                "id=" + id +
                ", frequency=" + frequency +
                ", cueCount=" + cueCount +
                ", permanentProduct='" + permanentProduct + '\'' +
                ", durationInSeconds=" + durationInSeconds +
                ", accuracyPercentage=" + accuracyPercentage +
                ", trialId=" + trialId +
                ", enabled=" + enabled +
                '}';
    }
}

