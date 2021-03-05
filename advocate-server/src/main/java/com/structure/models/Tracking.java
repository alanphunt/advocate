package com.structure.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.structure.constraints.BaselineConstraint;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.Valid;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "trackings")
@Where(clause = "enabled=1")
//@BaselineConstraint
public class Tracking {
    
    @Id
    private String id;

//    @RequiredFieldConstraint(key = "trackingLabel")
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

    @Column(name = "baseline_id")
    private String baselineId;
    
    private int enabled, correct, frequency, best;

    @Column(name = "out_of")
    private int outOf;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name="trial_id", insertable = false, updatable = false)
    private Trial trial;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "baseline_id", insertable = false, updatable = false)
    private Baseline baseline;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OneToMany(mappedBy = "tracking", cascade = {CascadeType.ALL}, orphanRemoval = true)
//    @Valid
    private List<TrackingMeta> trackingMeta = new ArrayList<>();

    @Transient
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private ArrayList<String> trackingMetaIds = new ArrayList<>();

    public Tracking(){}

    public Tracking(String id, String trialId, String baselineId, String label) {
        this.id = id;
        this.trialId = trialId;
        this.baselineId = baselineId;
        this.label = label;
        this.enabled = 1;
    }

    public Tracking(String id, String label){
        this.id = id;
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

    public int getBest() {
        return best;
    }

    public void setBest(int best) {
        this.best = best;
    }

    public int getOutOf() {
        return outOf;
    }

    public void setOutOf(int outOf) {
        this.outOf = outOf;
    }

    public String getBaselineId() {
        return baselineId;
    }

    public void setBaselineId(String baselineId) {
        this.baselineId = baselineId;
    }

    public List<TrackingMeta> getTrackingMeta() {
        return trackingMeta;
    }

    public void setTrackingMeta(List<TrackingMeta> trackingMeta) {
        this.trackingMeta = trackingMeta;
    }

    public ArrayList<String> getTrackingMetaIds() {
        return trackingMetaIds;
    }

    public void setTrackingMetaIds(ArrayList<String> trackingMetaIds) {
        this.trackingMetaIds = trackingMetaIds;
    }

    @Override
    public String toString() {
        return "Tracking{" +
                "id='" + id + '\'' +
                ", label='" + label + '\'' +
                ", cueCount=" + cueCount +
                ", permanentProduct='" + permanentProduct + '\'' +
                ", durationInSeconds=" + durationInSeconds +
                ", accuracyPercentage=" + accuracyPercentage +
                ", trialId='" + trialId + '\'' +
                ", baselineId='" + baselineId + '\'' +
                ", enabled=" + enabled +
                ", correct=" + correct +
                ", frequency=" + frequency +
                ", best=" + best +
                ", outOf=" + outOf +
                ", trackingMetaIds=" + trackingMetaIds +
                ", trackingMeta=" + trackingMeta +
                '}';
    }
}
