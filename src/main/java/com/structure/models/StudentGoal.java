package com.structure.models;

import com.google.gson.annotations.Expose;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "student_goal")
public class StudentGoal implements Serializable {

    @Expose
    @Id
    private String id;

    @ManyToOne
    @JoinColumn(name = "student_id", insertable = false, updatable = false)
    private Student student;

    @Expose
    @OneToMany
    @JoinColumn(name = "id", referencedColumnName = "goal_id")
    private List<Goal> goal;

    @Expose
    @Column(name = "goal_id")
    private String goalId;

    @Expose
    @Column(name = "student_id")
    private String studentId;

    @Expose
    @OneToMany
    @OrderBy("label ASC")
    @JoinColumn(name = "goal_id", referencedColumnName="goal_id")
    private List<Benchmark> benchmarks;


    @Expose
    @Column(name = "start_date")
    private Date startDate;

    @Expose
    @Column(name = "mastery_date")
    private Date masteryDate;

    @Expose
    private boolean monitor;

    @Expose
    private int enabled;

    public StudentGoal() {
    }

    public StudentGoal(String id, String goalId, String studentId, Date startDate, Date masteryDate, boolean monitor){
        this.id = id;
        this.goalId = goalId;
        this.studentId = studentId;
        this.startDate = startDate;
        this.masteryDate = masteryDate;
        this.monitor = monitor;
        this.enabled = 1;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getGoalId() {
        return goalId;
    }

    public void setGoalId(String goalId) {
        this.goalId = goalId;
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

    public List<Goal> getGoal() {
        return goal;
    }

    public void setGoal(List<Goal> goal) {
        this.goal = goal;
    }

    public List<Benchmark> getBenchmarks() {
        return benchmarks;
    }

    public void setBenchmarks(List<Benchmark> benchmarks) {
        this.benchmarks = benchmarks;
    }

    public int getEnabled() {
        return enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getMasteryDate() {
        return masteryDate;
    }

    public void setMasteryDate(Date masteryDate) {
        this.masteryDate = masteryDate;
    }

    public boolean getMonitor() {
        return monitor;
    }

    public void setMonitor(boolean monitor) {
        this.monitor = monitor;
    }

    @Override
    public String toString() {
        return "StudentGoal{" +
                "id='" + id + '\'' +
                ", student=" + student +
                ", goal=" + goal.get(0).toString() +
                ", goalId='" + goalId + '\'' +
                ", studentId='" + studentId + '\'' +
                ", startDate=" + startDate +
                ", masteryDate=" + masteryDate +
                ", monitor=" + monitor +
                ", enabled=" + enabled +
                '}';
    }
}
