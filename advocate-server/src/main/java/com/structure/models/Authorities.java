package com.structure.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.Where;
import org.springframework.security.core.GrantedAuthority;

@Entity
@Table(name = "authorities")
@Where(clause = "enabled=1")
public class Authorities implements GrantedAuthority {
    
    @Id
    private String id;
    private String username;
    private String authority;
    private int enabled;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "username", insertable = false, updatable = false)
    private AccountDetails accountDetails;

    public Authorities() {
    }

    public Authorities(String id, String username, String authority) {
        this.id = id;
        this.username = username;
        this.authority = authority;
        this.enabled = 1;
    }

    @Override
    public String getAuthority() {
        return this.authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getEnabled() {
        return this.enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

    @Override
    public String toString() {
        return "Authorities{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", authority='" + authority + '\'' +
                ", enabled=" + enabled +
                '}';
    }
}
