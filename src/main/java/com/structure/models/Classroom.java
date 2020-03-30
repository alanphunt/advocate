package com.structure.models;

import javax.persistence.*;

@Entity
@Table(name = "classrooms", schema = "advocate")
public class Classroom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int enabled;

    @Column(name = "class_name")
    private String className;

    @Column(name = "teacher_id")
    private int teacherId;

    @Column(name = "student_count")
    private int studentCount;

    public Classroom() {
    }

    public Classroom(String className, int teacherId, int studentCount){
        this.className = className;
        this.teacherId = teacherId;
        this.studentCount = studentCount;
        this.enabled = 1;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public int getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(int teacherId) {
        this.teacherId = teacherId;
    }

    public int getStudentCount() {
        return studentCount;
    }

    public void setStudentCount(int studentCount) {
        this.studentCount = studentCount;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getEnabled() {
        return enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

    @Override
    public String toString() {
        return "Classroom{" +
                "id=" + id +
                ", enabled=" + enabled +
                ", className='" + className + '\'' +
                ", teacherId=" + teacherId +
                ", studentCount=" + studentCount +
                '}';
    }

    public int increaseCount(){
        return this.studentCount++;
    }
}
