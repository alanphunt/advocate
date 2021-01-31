package com.structure.models;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.Where;
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

    @JsonIgnore
    @OneToMany(mappedBy = "accountDetails", cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
    private Collection<Authorities> authorities;

    @JsonIgnore
    @OneToOne(mappedBy = "accountDetails", fetch = FetchType.LAZY)
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
            ", authorities='" + getAuthorities() + "'" +
            "}";
    }

}
