package com.structure.models;

import org.hibernate.annotations.Where;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "classrooms")
@Where(clause = "enabled=1")
public class Classroom {
    @Id
    private String id;

    private int enabled;

    @Column(name = "class_name")
    private String className;
    
    @Column(name = "teacher_id")
    private String teacherId;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OneToMany(mappedBy = "classroom", cascade = {CascadeType.ALL})
    private List<Student> students = new ArrayList<>();

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "teacher_id", insertable = false, updatable = false)
    private Teacher teacher;

    @Transient
    private ArrayList<String> studentIds = new ArrayList<>();

    public Classroom() {
    }

    public Classroom(String id, String className, String teacherId){
        this.id = id;
        this.className = className;
        this.teacherId = teacherId;
        this.enabled = 1;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getEnabled() {
        return enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    public ArrayList<String> getStudentIds() {
        return studentIds;
    }

    public void setStudentIds(ArrayList<String> studentIds) {
        this.studentIds = studentIds;
    }

    @Override
    public String toString() {
        return "Classroom{" +
                "id=" + id +
                ", enabled=" + enabled +
                ", className=" + className +
                ", teacherId=" + teacherId +
                ", students=" + students +
                ", studentIds=" + studentIds +
                '}';
    }

}