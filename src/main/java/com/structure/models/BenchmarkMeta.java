package com.structure.models;

import com.google.gson.annotations.Expose;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.List;

@Entity(name = "benchmark_meta")
public class BenchmarkMeta {

    @Expose
    @Id
    private String id;

    @Expose
    @Column(name = "student_goal_id")
    private String studentGoalId;

    @Expose
    @Column(name = "benchmark_id")
    private String benchmarkId;

    @Expose
    @Column(name = "met_date")
    private Date metDate;

    @Expose
    @Column(name = "mastery_date")
    private Date masteryDate;

    @Expose
    private int enabled, complete;

    @Expose
    @OneToMany(mappedBy = "benchmarkMeta")
    private List<Trial> trials;

    public BenchmarkMeta () {}

    public BenchmarkMeta (String id, String studentGoalId, String benchmarkId) {
        this.id = id;
        this.studentGoalId = studentGoalId;
        this.benchmarkId = benchmarkId;
        this.enabled = 1;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStudentGoalId() {
        return studentGoalId;
    }

    public void setStudentGoalId(String studentGoalId) {
        this.studentGoalId = studentGoalId;
    }

    public String getBenchmarkId() {
        return benchmarkId;
    }

    public void setBenchmarkId(String benchmarkId) {
        this.benchmarkId = benchmarkId;
    }

    public Date getMetDate() {
        return metDate;
    }

    public void setMetDate(Date metDate) {
        this.metDate = metDate;
    }

    public Date getMasteryDate() {
        return masteryDate;
    }

    public void setMasteryDate(Date masteryDate) {
        this.masteryDate = masteryDate;
    }

    public int getEnabled() {
        return enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

    public int getComplete() {
        return complete;
    }

    public void setComplete(int complete) {
        this.complete = complete;
    }

    @Override
    public String toString() {
        return "BenchmarkMeta{" +
                "id='" + id + '\'' +
                ", studentGoalId='" + studentGoalId + '\'' +
                ", benchmarkId='" + benchmarkId + '\'' +
                ", metDate=" + metDate +
                ", masteryDate=" + masteryDate +
                ", enabled=" + enabled +
                ", complete=" + complete +
                '}';
    }
}
