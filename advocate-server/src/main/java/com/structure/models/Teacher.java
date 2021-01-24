package com.structure.models;

import org.hibernate.annotations.Where;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.structure.utilities.Constants;

import java.util.*;

@Entity
@Table(name = "teachers")
@Where(clause = "enabled=1")
public class Teacher {

    @Id
    private String id;
    
    private String username;

    private int enabled;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = Constants.DATE_FORMAT)
    @Column(name = "date_created")
    private Date dateCreated;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;
    
    private String description;

    @JsonIgnore
    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Classroom> classrooms;

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name="username", insertable = false, updatable = false)
    private AccountDetails accountDetails;

    @Transient
    private ArrayList<String> classroomIds = new ArrayList<>();

    public Teacher(){}

    public Teacher(String id, String firstName, String lastName, String username) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
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

    public String getUsername(){
        return this.username;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public int getEnabled() {
        return enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
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
                ", username=" + username +
                ", dateCreated=" + dateCreated +
                ", firstName=" + firstName +
                ", lastName=" + lastName +
                ", description=" + description +
                ", accountDetails=" + accountDetails +
                ", classroomIds=" + classroomIds +
                ", classrooms=" + Arrays.toString(classrooms.toArray()) +
                '}';
    }
}