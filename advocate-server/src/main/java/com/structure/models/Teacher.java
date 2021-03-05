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

    @Column(name = "account_id")
    private String accountId;
    
    private int enabled;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;
    
    private String description;

    @OneToMany(mappedBy = "teacher", cascade = {CascadeType.ALL})
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Classroom> classrooms = new ArrayList<>();

    @JsonIgnore
    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private AccountDetails accountDetails;

    @Transient
    private ArrayList<String> classroomIds = new ArrayList<>();

    public Teacher(){}

    public Teacher(String id, String firstName, String lastName, String accountId) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.accountId = accountId;
        this.enabled = 1;
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
                ", accountId=" + accountId +
                ", firstName=" + firstName +
                ", lastName=" + lastName +
                ", description=" + description +
                ", accountDetails=" + accountDetails +
                ", classroomIds=" + classroomIds +
                ", classrooms=" + Arrays.toString(classrooms.toArray()) +
                '}';
    }
}