package com.structure.models;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.Where;
import org.springframework.security.core.GrantedAuthority;

@Entity
@Table(name = "authorities")
@Where(clause = "enabled=1")
public class Authorities implements GrantedAuthority {
    
    @Id
    private String id;
    @Column(name = "account_id")
    private String accountId;
    private String authority;
    private int enabled;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "account_id", insertable = false, updatable = false)
    private AccountDetails accountDetails;

    public Authorities() {}

    public Authorities(String id, String accountId, String authority) {
        this.id = id;
        this.accountId = accountId;
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

    public String getAccountId() {
        return this.accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public int getEnabled() {
        return this.enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
