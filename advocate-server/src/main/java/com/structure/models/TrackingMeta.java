package com.structure.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.structure.constraints.RequiredFieldConstraint;
import com.structure.utilities.constants.Error;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table(name = "tracking_meta")
@Where(clause = "enabled=1")
public class TrackingMeta {

    @Id
    private String id;
    @Column(name = "tracking_id")
    private String trackingId;

    private String label;

    private int correct;
    private int enabled;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "tracking_id", updatable = false, insertable = false)
    private Tracking tracking;

    public TrackingMeta(){}

    public TrackingMeta(String id, String trackingId, String label, int correct){
        this.id = id;
        this.trackingId = trackingId;
        this.label = label;
        this.correct = correct;
        this.enabled = 1;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTrackingId() {
        return trackingId;
    }

    public void setTrackingId(String trackingId) {
        this.trackingId = trackingId;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public int getCorrect() {
        return correct;
    }

    public void setCorrect(int correct) {
        this.correct = correct;
    }

    public int getEnabled() {
        return enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

    @Override
    public String toString() {
        return "TrackingMeta{" +
                "id='" + id + '\'' +
                ", trackingId='" + trackingId + '\'' +
                ", label='" + label + '\'' +
                ", correct=" + correct +
                ", enabled=" + enabled +
                '}';
    }
}
