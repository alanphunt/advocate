package com.structure.models;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.structure.utilities.Constants;
import org.hibernate.annotations.Where;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "account_details")
@Where(clause = "enabled=1")
public class AccountDetails implements UserDetails{

    @Id
    @JsonIgnore
    private String id;
    private String username;
    @JsonIgnore
    private String password;
    @Column(name = "account_non_expired")
    private boolean isAccountNonExpired;
    @Column(name = "account_non_locked")
    private boolean isAccountNonLocked;
    @Column(name = "credentials_non_expired")
    private boolean isCredentialsNonExpired;
    @JsonIgnore
    private boolean enabled;
    @Column(name = "date_created")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = Constants.DATE_FORMAT)
    private Date dateCreated;

    @OneToMany(mappedBy = "accountDetails", cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Authorities> authorities;

    @OneToOne(mappedBy = "accountDetails", cascade = CascadeType.ALL, optional = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Teacher teacher;

    @Transient
    private String role;

    public AccountDetails() {
    }

    public AccountDetails(String id, String username, String password, List<Authorities> authorities) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.isAccountNonExpired = true;
        this.isAccountNonLocked = true;
        this.isCredentialsNonExpired = true;
        this.enabled = true;
        this.authorities = authorities;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return isAccountNonExpired;
    }

    public void setAccountNonExpired(boolean accountNonExpired) {
        isAccountNonExpired = accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    public void setAccountNonLocked(boolean accountNonLocked) {
        isAccountNonLocked = accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isCredentialsNonExpired;
    }

    public void setCredentialsNonExpired(boolean credentialsNonExpired) {
        isCredentialsNonExpired = credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    @Override
    public List<Authorities> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(List<Authorities> authorities) {
        this.authorities = authorities;
    }

/*    public List<Teacher> getTeacher() {
        return teacher;
    }

    public void setTeacher(List<Teacher> teacher) {
        this.teacher = teacher;
    }*/

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
