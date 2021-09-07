package com.structure.models;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.structure.utilities.Constants;
import org.hibernate.annotations.Where;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "account_details")
@Where(clause = "enabled=1")
public class AccountDetails implements UserDetails{

    @Id
    private String username;
    private String password;
    @Column(name = "account_non_expired")
    private boolean isAccountNonExpired;
    @Column(name = "account_non_locked")
    private boolean isAccountNonLocked;
    @Column(name = "credentials_non_expired")
    private boolean isCredentialsNonExpired;
    private boolean enabled;
    @Column(name = "teacher_id")
    private String teacherId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = Constants.DATE_TIME_FORMAT)
    @Column(name = "date_created")
    private LocalDateTime dateCreated;

    @JsonIgnore
    @OneToMany(mappedBy = "accountDetails", cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
    private Collection<Authorities> authorities;

    @JsonIgnore
    @JoinColumn(name="teacher_id", referencedColumnName = "id", insertable = false, updatable = false)
    @OneToOne(cascade = {CascadeType.ALL})
    private Teacher teacher;
 
    public AccountDetails() {
    }

    public AccountDetails(String username, String password, String teacherId, Collection<Authorities> authorities) {
        this.username = username;
        this.password = password;
        this.teacherId = teacherId;
        this.isAccountNonExpired = true;
        this.isAccountNonLocked = true;
        this.isCredentialsNonExpired = true;
        this.enabled = true;
        this.authorities = authorities;
        this.dateCreated = LocalDateTime.now();
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.isAccountNonExpired;
    }

    public void setIsAccountNonExpired(boolean isAccountNonExpired) {
        this.isAccountNonExpired = isAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.isAccountNonLocked;
    }

    public void setIsAccountNonLocked(boolean isAccountNonLocked) {
        this.isAccountNonLocked = isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.isCredentialsNonExpired;
    }

    public void setIsCredentialsNonExpired(boolean isCredentialsNonExpired) {
        this.isCredentialsNonExpired = isCredentialsNonExpired;
    }

    public boolean isEnabled() {
        return this.enabled;
    }

    public boolean getEnabled() {
        return this.enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getTeacherId(){
        return this.teacherId;
    }

    public void setTeacherId(String teacherId){
        this.teacherId = teacherId;
    }

    @Override
    public Collection<Authorities> getAuthorities() {
        return this.authorities;
    }

    public void setAuthorities(Collection<Authorities> authorities) {
        this.authorities = authorities;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    @Override
    public String toString() {
        return "{" +
            "username='" + getUsername() + "'" +
            ", password='" + getPassword() + "'" +
            ", teacherId='" + getTeacherId() + "'" +
            ", isAccountNonExpired='" + isAccountNonExpired() + "'" +
            ", isAccountNonLocked='" + isAccountNonLocked() + "'" +
            ", isCredentialsNonExpired='" + isCredentialsNonExpired() + "'" +
            ", enabled='" + isEnabled() + "'" +
            ", dateCreated=" + getDateCreated() +
            ", authorities='" + getAuthorities() + "'" +
            "}";
    }

}
