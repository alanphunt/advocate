package com.structure.models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "students")
@Where(clause = "enabled=1")
public class Student {

    @Id
    @Expose
    private String id;

    @ManyToOne
    @JoinColumn(name = "classroom_id", insertable = false, updatable = false)
    private Classroom classroom;

    @Expose
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Goal> goals;

    @Expose
    private String name, grade, age;

    @Expose
    @Column(name = "classroom_id")
    private String classroomId;

    @Expose
    private int enabled;

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

    public Classroom getClassroom() {
        return classroom;
    }

    public void setClassroom(Classroom classroom) {
        this.classroom = classroom;
    }

    public List<Goal> getGoals (){
        return goals;
    }

    public void setGoals (List<Goal> goals){
        this.goals = goals;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name=" + name +
                ", age=" + age +
                ", grade=" + grade +
                ", classroomId=" + classroomId +
                ", enabled=" + enabled +
                '}';
    }
}