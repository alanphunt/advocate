package com.structure.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "jwt_key")
public class JwtKey {

    @Id
    private String id;

    @Column(name = "key_value")
    private String key;

    public JwtKey() {}

    public JwtKey(String id, String key){
        this.id = id;
        this.key = key;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
