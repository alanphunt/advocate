package com.structure.models;

import org.hibernate.annotations.Where;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "students")
@Where(clause = "enabled=1")
public class Student {

    @Id
    private String id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "classroom_id", insertable = false, updatable = false)
    private Classroom classroom;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<Goal> goals = new ArrayList<>();

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<Baseline> baselines = new ArrayList<>();

    private String name, grade, age;
    
    @Column(name = "classroom_id")
    private String classroomId;

    private int enabled;

    @Transient
    private ArrayList<String> goalIds = new ArrayList<>();

    @Transient
    private ArrayList<String> baselineIds = new ArrayList<>();

    public Student(){}

    public Student(String id, String name, String age, String grade, String classroomId) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.grade = grade;
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

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
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

    public List<Goal> getGoals (){
        return goals;
    }

    public void setGoals (List<Goal> goals){
        this.goals = goals;
    }

    public ArrayList<String> getGoalIds() {
        return goalIds;
    }

    public void setGoalIds(ArrayList<String> goalIds) {
        this.goalIds = goalIds;
    }

    public List<Baseline> getBaselines() {
        return baselines;
    }

    public void setBaselines(List<Baseline> baselines) {
        this.baselines = baselines;
    }

    public ArrayList<String> getBaselineIds() {
        return baselineIds;
    }

    public void setBaselineIds(ArrayList<String> baselineIds) {
        this.baselineIds = baselineIds;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id='" + id + '\'' +
                ", goals=" + goals +
                ", baselines=" + baselines +
                ", baselineIds=" + baselineIds +
                ", name='" + name + '\'' +
                ", grade='" + grade + '\'' +
                ", age='" + age + '\'' +
                ", classroomId='" + classroomId + '\'' +
                ", enabled=" + enabled +
                ", goalIds=" + goalIds +
                '}';
    }
}