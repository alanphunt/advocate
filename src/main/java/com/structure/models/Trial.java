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
    @Column(name = "benchmark_id")
    private String benchmarkId;

    @Expose
    @Column(name = "student_id")
    private String studentId;

    @ManyToOne
    @JoinColumn(name = "student_id", insertable = false, updatable = false)
    private Student student;

    @Expose
    @OneToMany(mappedBy = "trial")
    private List<Tracking> trackings;


    @Expose
    private int enabled;

    public Trial (){}

    public Trial(String id, Date dateStarted, String comments, String benchmarkId) {
        this.id = id;
        this.dateStarted = dateStarted;
        this.comments = comments;
        this.benchmarkId = benchmarkId;
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
                "id='" + id + '\'' +
                ", dateStarted=" + dateStarted +
                ", dateCompleted=" + dateCompleted +
                ", comments='" + comments + '\'' +
                ", benchmarkId='" + benchmarkId + '\'' +
                ", studentId='" + studentId + '\'' +
                ", enabled=" + enabled +
                '}';
    }
}
