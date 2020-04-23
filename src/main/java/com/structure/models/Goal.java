package com.structure.models;

import com.google.gson.annotations.Expose;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "goals")
public class Goal {

    @Id
    @Expose
    private String id;

    @Expose
    @Column(name = "goal_name")
    private String goalName;

    @Expose
    @Column(name = "start_date")
    private Date startDate;

    @Expose
    @Column(name = "mastery_date")
    private Date masteryDate;

    @Expose
    private boolean monitor;

    @Expose
    private String process;

    @Expose
    private int enabled;

    @ManyToMany(mappedBy = "goals")
    private List<Student> students;

    @Expose
    @OneToMany(mappedBy = "goal")
    private List<Benchmark> benchmarks;

    public Goal(){}

    public Goal(String id, String goalName, Date startDate, Date masteryDate, boolean monitor, String process) {
        this.id = id;
        this.goalName = goalName;
        this.startDate = startDate;
        this.masteryDate = masteryDate;
        this.monitor = monitor;
        this.process = process;
        this.enabled = 1;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getGoalName() {
        return goalName;
    }

    public void setGoalName(String goalName) {
        this.goalName = goalName;
    }

    @Override
    public String toString() {
        return "Goal{" +
                "id=" + id +
                ", goalName=" + goalName +
                ", startDate=" + startDate +
                ", masteryDate=" + masteryDate +
                ", monitor=" + monitor +
                ", process='" + process + '\'' +
                ", enabled=" + enabled +
                '}';
    }
}
