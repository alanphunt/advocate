package com.structure.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.structure.utilities.Constants;

import org.hibernate.annotations.Where;

import javax.persistence.*;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "trials")
@Where(clause = "enabled=1")
public class Trial {

    @Id
    private String id;

    private String label;

    @Column(name = "trial_number")
    private int trialNumber;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = Constants.DATE_FORMAT)
    @Column(name = "date_started")
    private Date dateStarted;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = Constants.DATE_FORMAT)
    @Column(name = "date_completed")
    private Date dateCompleted;
    
    private String comments;

    @Column(name = "benchmark_id")
    private String benchmarkId;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "benchmark_id", insertable = false, updatable = false)
    private Benchmark benchmark;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OneToMany(mappedBy = "trial", cascade = {CascadeType.ALL}, orphanRemoval = true)
    @OrderBy("label ASC")
    private List<Tracking> trackings = new ArrayList<>();

    
    @OneToMany(mappedBy = "trial", cascade = {CascadeType.ALL}, orphanRemoval = true)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OrderBy("uploadDate ASC")
    private List<Document> documents = new ArrayList<>();

    @Transient
    private ArrayList<String> trackingIds = new ArrayList<>();

    @Transient
    private ArrayList<String> documentIds = new ArrayList<>();

    @Column(name = "trial_template")
    private String trialTemplate;
    
    private int enabled;

    public Trial (){}

    public Trial(String id, int trialNumber, Date dateStarted, String comments, String benchmarkId) {
        this.id = id;
        this.trialNumber = trialNumber;
        this.dateStarted = dateStarted;
        this.comments = comments;
        this.benchmarkId = benchmarkId;
        this.enabled = 1;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLabel() {
        return this.label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public int getTrialNumber() {
        return this.trialNumber;
    }

    public void setTrialNumber(int trialNumber) {
        this.trialNumber = trialNumber;
    }

    public Date getDateStarted() {
        return this.dateStarted;
    }

    public void setDateStarted(Date dateStarted) {
        this.dateStarted = dateStarted;
    }

    public Date getDateCompleted() {
        return this.dateCompleted;
    }

    public void setDateCompleted(Date dateCompleted) {
        this.dateCompleted = dateCompleted;
    }

    public String getComments() {
        return this.comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getBenchmarkId() {
        return this.benchmarkId;
    }

    public void setBenchmarkId(String benchmarkId) {
        this.benchmarkId = benchmarkId;
    }

    public Benchmark getBenchmark() {
        return this.benchmark;
    }

    public void setBenchmark(Benchmark benchmark) {
        this.benchmark = benchmark;
    }

    public List<Tracking> getTrackings() {
        return this.trackings;
    }

    public void setTrackings(List<Tracking> trackings) {
        this.trackings = trackings;
    }

    public List<Document> getDocuments() {
        return this.documents;
    }

    public void setDocuments(List<Document> documents) {
        this.documents = documents;
    }

    public int getEnabled() {
        return this.enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

    public ArrayList<String> getTrackingIds() {
        return trackingIds;
    }

    public void setTrackingIds(ArrayList<String> trackingIds) {
        this.trackingIds = trackingIds;
    }

    public ArrayList<String> getDocumentIds() {
        return documentIds;
    }

    public void setDocumentIds(ArrayList<String> documentIds) {
        this.documentIds = documentIds;
    }

    public String getTrialTemplate() {
        return trialTemplate;
    }

    public void setTrialTemplate(String trialTemplate) {
        this.trialTemplate = trialTemplate;
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", trialNumber='" + getTrialNumber() + "'" +
            ", dateStarted='" + getDateStarted() + "'" +
            ", label='" + getLabel() + "'" +
            ", dateCompleted='" + getDateCompleted() + "'" +
            ", comments='" + getComments() + "'" +
            ", benchmarkId='" + getBenchmarkId() + "'" +
            ", benchmark='" + getBenchmark() + "'" +
            ", trialTemplate='" + getTrialTemplate() + "'" +
            ", trackings='" + getTrackings() + "'" +
            ", documents='" + getDocuments() + "'" +
            ", documentIds='" + getDocumentIds() + "'" +
            ", trackingIds='" + getTrackingIds() + "'" +
            ", enabled='" + getEnabled() + "'" +
            "}";
    }

}