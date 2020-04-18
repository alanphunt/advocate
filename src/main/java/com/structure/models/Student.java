package com.structure.models;

import com.google.gson.annotations.Expose;

import javax.persistence.*;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @Expose
    private String id;

    @Expose
    private String name, eligibility, skills;

    @Expose
    @Column(name="goal_count")
    private int goalCount;

    @ManyToOne
    @JoinColumn(name = "classroom_id", insertable = false, updatable = false)
    private Classroom classroom;

    @Expose
    @Column(name = "classroom_id")
    private String classroomId;

    @Expose
    private int enabled;

    public Student(){}

    public Student(String id, String name, String eligibility, String skills, int goalCount, String classroomId) {
        this.id = id;
        this.name = name;
        this.eligibility = eligibility;
        this.skills = skills;
        this.goalCount = goalCount;
        this.classroomId = classroomId;
        this.enabled = 1;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEligibility() {
        return eligibility;
    }

    public void setEligibility(String eligibility) {
        this.eligibility = eligibility;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public int getGoalCount() {
        return goalCount;
    }

    public void setGoalCount(int goalCount) {
        this.goalCount = goalCount;
    }

    public String getClassroomId() {
        return classroomId;
    }

    public void setClassroomId(String classroomId) {
        this.classroomId = classroomId;
    }

    public int getEnabled() {
        return enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", eligibility='" + eligibility + '\'' +
                ", skills='" + skills + '\'' +
                ", goalCount=" + goalCount +
                ", classroomId=" + classroomId +
                ", enabled=" + enabled +
                '}';
    }
}
