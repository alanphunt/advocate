package com.structure.models;

import com.google.gson.annotations.Expose;

import javax.persistence.*;
import java.util.Date;

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
    @Column(name = "trial_length_minutes")
    private int trialLengthMinutes;

    @Expose
    private String comments;

    @Expose
    @Column(name = "benchmark_id")
    private String benchmarkId;

    @Expose
    @Column(name = "student_id")
    private String studentId;

    @ManyToOne
    @JoinColumn(name = "student_id", insertable = false, updatable = false)
    private Student student;

    @Expose
    private int enabled;

    public Trial (){}

    public Trial(String id, Date dateStarted, int trialLengthMinutes, String comments, String benchmarkId) {
        this.id = id;
        this.dateStarted = dateStarted;
        this.trialLengthMinutes = trialLengthMinutes;
        this.comments = comments;
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

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    @Override
    public String toString() {
        return "Trial{" +
                "id=" + id +
                ", dateStarted=" + dateStarted +
                ", trialLengthMinutes=" + trialLengthMinutes +
                ", comments=" + comments +
                ", benchmarkId=" + benchmarkId +
                ", enabled=" + enabled +
                '}';
    }
}
