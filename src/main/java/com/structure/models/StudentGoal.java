package com.structure.models;

import com.google.gson.annotations.Expose;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "student_goal")
public class StudentGoal {

    @Id
    @Expose
    private String id;

    @Column(name = "stu_id")
    private String stuId;

    @Expose
    @Column(name = "goal_id")
    private String goalId;

    @Expose
    private int enabled;

    public StudentGoal() {
    }

    public StudentGoal(String id, String stuId, String goalId){
        this.id = id;
        this.stuId = stuId;
        this.goalId = goalId;
        this.enabled = 1;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStuId() {
        return stuId;
    }

    public void setStuId(String stuId) {
        this.stuId = stuId;
    }

    public String getGoalId() {
        return goalId;
    }

    public void setGoalId(String goalId) {
        this.goalId = goalId;
    }

    public int getEnabled() {
        return enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

    @Override
    public String toString() {
        return "StudentGoal{" +
                "id=" + id +
                ", stuId='" + stuId + '\'' +
                ", goalId='" + goalId + '\'' +
                ", enabled=" + enabled +
                '}';
    }
}
