package com.structure.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.Where;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.*;

@Entity
@Table(name = "teachers")
@Where(clause = "enabled=1")
public class Teacher {

    @Id
    private String id;
    
    private int enabled;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String username;

    @OneToMany(mappedBy = "teacher", cascade = {CascadeType.ALL})
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Classroom> classrooms = new ArrayList<>();

    @JsonIgnore
    @OneToOne(mappedBy = "teacher")
    private AccountDetails accountDetails;

    @Transient
    private ArrayList<String> classroomIds = new ArrayList<>();

    public Teacher(){}

    public Teacher(String id, String firstName, String lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.enabled = 1;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<Classroom> getClassrooms() {
        return classrooms;
    }

    public void setClassrooms(List<Classroom> classrooms) {
        this.classrooms = classrooms;
    }
 
    public AccountDetails getAccountDetails(){
        return this.accountDetails;
    }

    public void setAccountDetails(AccountDetails accountDetails){
        this.accountDetails = accountDetails;
    }

    public ArrayList<String> getClassroomIds() {
        return classroomIds;
    }

    public void setClassroomIds(ArrayList<String> classroomIds) {
        this.classroomIds = classroomIds;
    }

    @Override
    public String toString() {
        return "Teacher{" +
                "id=" + id +
                ", enabled=" + enabled +
                ", firstName=" + firstName +
                ", lastName=" + lastName +
                ", username=" + username +
                ", accountDetails=" + accountDetails +
                ", classroomIds=" + classroomIds +
                ", classrooms=" + Arrays.toString(classrooms.toArray()) +
                '}';
    }
}