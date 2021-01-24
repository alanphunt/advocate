package com.structure.models;

import org.hibernate.annotations.Where;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "trackings")
@Where(clause = "enabled=1")
public class Tracking {
    
    @Id
    private String id;
    
    private String label;
    
    @Column(name = "cue_count")
    private int cueCount;

    @Column(name = "permanent_product")
    private String permanentProduct;

    @Column(name = "duration_in_seconds")
    private int durationInSeconds;

    @Column(name = "accuracy_percentage")
    private double accuracyPercentage;
    
    @Column(name = "trial_id")
    private String trialId;
    
    private int enabled, correct, frequency;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "trial_id", updatable = false, insertable = false)
    private Trial trial;

    public Tracking(){}

    public Tracking(String id, String trialId, String label) {
        this.id = id;
        this.trialId = trialId;
        this.label = label;
        this.enabled = 1;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public String getTrialId() {
        return trialId;
    }

    public void setTrialId(String trialId) {
        this.trialId = trialId;
    }

    public int getEnabled() {
        return enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

    public int getCorrect() {
        return correct;
    }

    public void setCorrect(int correct) {
        this.correct = correct;
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
                ", correct=" + correct +
                ", enabled=" + enabled +
                ", label=" + label +
                '}';
    }
}
