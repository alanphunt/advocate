package com.structure.models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "goals")
@Where(clause = "enabled=1")
public class Goal {

    @Id
    @Expose
    private String id;

    @Expose
    private String goal;

    @Expose
    @Column(name = "goal_name")
    private String goalName;

    @Expose
    private String process;

    @Expose
    private int enabled, monitor;

    @Expose
    @Column(name = "start_date")
    private Date startDate;

    @Expose
    @Column(name = "mastery_date")
    private Date masteryDate;

    @Expose
    @Column(name = "student_id")
    private String studentId;

    @Expose
    @Column(name = "completion_date")
    private Date completionDate;

    @Expose
    private int complete;

    @ManyToOne
    @JoinColumn(name = "student_id", insertable = false, updatable = false)
    private Student student;

    @OneToMany(mappedBy = "goal", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("label ASC")
    @Expose
    private List<Benchmark> benchmarks;

    public Goal(){}

    public Goal(String id, String goal, String goalName, String process, String studentId, Date startDate, Date masteryDate, int monitor) {
        this.id = id;
        this.goal = goal;
        this.goalName = goalName;
        this.process = process;
        this.studentId = studentId;
        this.startDate = startDate;
        this.masteryDate = masteryDate;
        this.monitor = monitor;
        this.enabled = 1;
    }

    public String getGoal() {
        return goal;
    }

    public void setGoal(String goal) {
        this.goal = goal;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getGoalName() {
        return goalName;
    }

    public void setGoalName(String goalName) {
        this.goalName = goalName;
    }

    public String getProcess() {
        return process;
    }

    public void setProcess(String process) {
        this.process = process;
    }

    public int getEnabled() {
        return enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

    public int getMonitor() {
        return monitor;
    }

    public void setMonitor(int monitor) {
        this.monitor = monitor;
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

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public void setBenchmarks(List<Benchmark> benchmarks) {
        this.benchmarks = benchmarks;
    }

    public List<Benchmark> getBenchmarks () {
        return benchmarks;
    }

    @Override
    public String toString() {
        return "Goal{" +
                "id='" + id + '\'' +
                ", goalName='" + goalName + '\'' +
                ", process='" + process + '\'' +
                ", enabled=" + enabled +
                ", monitor=" + monitor +
                ", startDate=" + startDate +
                ", masteryDate=" + masteryDate +
                ", studentId='" + studentId + '\'' +
                '}';
    }
}