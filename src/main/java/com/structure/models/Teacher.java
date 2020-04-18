package com.structure.models;

import com.google.gson.annotations.Expose;
import com.structure.utilities.Utils;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "teachers")
public class Teacher {

    @Id
    @Expose
    private String id;

    @Expose
    private int enabled;

    @Expose
    private int phone;

    @Expose
    @Column(name = "date_created")
    private Date dateCreated;

    @Expose
    @Column(name = "first_name")
    private String firstName;

    @Expose
    @Column(name = "last_name")
    private String lastName;

    @Expose
    private String email;

    @Expose(serialize = false)
    private String password;

    @Expose
    private String description;

    @Expose
    @OneToMany(mappedBy = "teacher")
    List<Classroom> classrooms;

    public Teacher(){}

    public Teacher(Teacher teacher){
        this(teacher.getFirstName(), teacher.getLastName(), teacher.getEmail(), teacher.getPhone(), teacher.getPassword());
    }

    public Teacher(String firstName, String lastName, String email, int phone, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.id = Utils.generateUniqueId();
        this.enabled = 1;
        this.dateCreated = new Date();
        this.description = "";
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

    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Classroom> getClassrooms() {
        return classrooms;
    }

    public void setClassrooms(List<Classroom> classrooms) {
        this.classrooms = classrooms;
    }

    @Override
    public String toString() {
        return "Teacher{" +
                "id=" + id +
                ", enabled=" + enabled +
                ", phone=" + phone +
                ", dateCreated=" + dateCreated +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", description='" + description + '\'' +
                ", classrooms=" + Arrays.toString(classrooms.toArray()) +
                '}';
    }
}
