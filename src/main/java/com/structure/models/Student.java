package com.structure.models;

import javax.persistence.*;

@Entity
@Table(name = "students", schema = "advocate")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name, eligibility, skills;
    @Column(name = "case_manager")
    private String caseManager;
    @Column(name="goal_count")
    private int goalCount;
    @Column(name = "classroom_id")
    private int classroomId;
    private int enabled;

    public Student(){}

    public Student(String name, String eligibility, String skills, String caseManager, int goalCount, int classroomId) {
        this.name = name;
        this.eligibility = eligibility;
        this.skills = skills;
        this.caseManager = caseManager;
        this.goalCount = goalCount;
        this.classroomId = classroomId;
        this.enabled = 1;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public String getCaseManager() {
        return caseManager;
    }

    public void setCaseManager(String caseManager) {
        this.caseManager = caseManager;
    }

    public int getGoalCount() {
        return goalCount;
    }

    public void setGoalCount(int goalCount) {
        this.goalCount = goalCount;
    }

    public int getClassroomId() {
        return classroomId;
    }

    public void setClassroomId(int classroomId) {
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
                ", caseManager='" + caseManager + '\'' +
                ", goalCount=" + goalCount +
                ", classroomId=" + classroomId +
                ", enabled=" + enabled +
                '}';
    }

    public int increaseCount(){
        return this.goalCount++;
    }
}
