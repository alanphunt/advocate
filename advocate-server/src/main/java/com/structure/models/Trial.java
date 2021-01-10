package com.structure.models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "trials")
@Where(clause = "enabled=1")
public class Trial {

    @Id
    @Expose
    private String id;

    @Expose
    @Column(name = "trial_number")
    private int trialNumber;

    @Expose
    @Column(name = "date_started")
    private Date dateStarted;

    @Expose
    @Column(name = "date_completed")
    private Date dateCompleted;

    @Expose
    private String comments;

    @Expose
    @Column(name = "benchmark_id")
    private String benchmarkId;

    @ManyToOne
    @JoinColumn(name = "benchmark_id", insertable = false, updatable = false)
    private Benchmark benchmark;

    @Expose
    @OneToMany(mappedBy = "trial", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("label ASC")
    private List<Tracking> trackings;

    
    @OneToMany(mappedBy = "trial", cascade = CascadeType.ALL, orphanRemoval = true)
    @Expose
    @OrderBy("uploadDate ASC")
    private List<Document> documents;

    @Expose
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


    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", trialNumber='" + getTrialNumber() + "'" +
            ", dateStarted='" + getDateStarted() + "'" +
            ", dateCompleted='" + getDateCompleted() + "'" +
            ", comments='" + getComments() + "'" +
            ", benchmarkId='" + getBenchmarkId() + "'" +
            ", benchmark='" + getBenchmark() + "'" +
            ", trackings='" + getTrackings() + "'" +
            ", documents='" + getDocuments() + "'" +
            ", enabled='" + getEnabled() + "'" +
            "}";
    }

}