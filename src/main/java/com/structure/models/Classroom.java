package com.structure.models;

import com.google.gson.annotations.Expose;

import javax.persistence.*;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name = "classrooms")
public class Classroom {
    @Id
    @Expose
    private String id;

    @Expose
    private int enabled;

    @Expose
    @Column(name = "class_name")
    private String className;

    @Expose
    @Column(name = "teacher_id")
    private String teacherId;

    @Expose
    @OneToMany(mappedBy = "classroom")
    List<Student> students;

    @ManyToOne
    @JoinColumn(name = "teacher_id", insertable = false, updatable = false)
    Teacher teacher;

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

    @Override
    public String toString() {
        return "Classroom{" +
                "id=" + id +
                ", enabled=" + enabled +
                ", className='" + className +
                ", teacherId=" + teacherId +
                ", students=" + Arrays.toString(students.toArray()) +
        '}';
    }

}
