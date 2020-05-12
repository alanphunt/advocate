package com.structure.models;

import com.google.gson.annotations.Expose;

import javax.persistence.*;
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
    private String process;

    @Expose
    private int enabled;

    @Expose
    @OneToMany
    @OrderBy("label ASC")
    @JoinColumn(name = "goal_id")
    private List<Benchmark> benchmarks;


    public Goal(){}

    public Goal(String id, String goalName, String process) {
        this.id = id;
        this.goalName = goalName;
        this.process = process;
        this.enabled = 1;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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
                ", process=" + process +
                ", enabled=" + enabled +
                '}';
    }
}
