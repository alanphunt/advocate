package com.structure.models;

import com.google.gson.annotations.Expose;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "trials")
public class Trial {

    @Id
    @Expose
    private String id;

    @Expose
    @Column(name = "date_started")
    private Date dateStarted;

    @Expose
    @Column(name = "date_completed")
    private Date dateCompleted;

    @Expose
    private String comments;

    @Expose
    @Column(name = "benchmark_meta_id")
    private String benchmarkMetaId;

    @ManyToOne
    @JoinColumn(name = "benchmark_meta_id", insertable = false, updatable = false)
    private BenchmarkMeta benchmarkMeta;

/*    @Expose
    @OneToMany(mappedBy = "trial")
    private List<Tracking> trackings;*/

    @Expose
    private int enabled;

    public Trial (){}

    public Trial(String id, Date dateStarted, String comments, String benchmarkMetaId) {
        this.id = id;
        this.dateStarted = dateStarted;
        this.comments = comments;
        this.benchmarkMetaId = benchmarkMetaId;
        this.enabled = 1;
    }

    public Date getDateCompleted() {
        return dateCompleted;
    }

    public void setDateCompleted(Date dateCompleted) {
        this.dateCompleted = dateCompleted;
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

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getBenchmarkMetaId() {
        return benchmarkMetaId;
    }

    public void setBenchmarkMetaId(String benchmarkMetaId) {
        this.benchmarkMetaId = benchmarkMetaId;
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
                "id='" + id + '\'' +
                ", dateStarted=" + dateStarted +
                ", dateCompleted=" + dateCompleted +
                ", comments='" + comments + '\'' +
                ", benchmarkId='" + benchmarkMetaId + '\'' +
                ", enabled=" + enabled +
                '}';
    }
}
