package com.structure.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.structure.utilities.Constants;

import org.hibernate.annotations.Where;

@Entity
@Table(name = "documents")
@Where(clause = "enabled=1")
public class Document {
    
    @Id
    private String id;

    @Column(name = "trial_id")
    private String trialId;

    @Column(name = "baseline_id")
    private String baselineId;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "trial_id", insertable = false, updatable = false)
    private Trial trial;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "baseline_id", insertable = false, updatable = false)
    private Baseline baseline;
    
    private String name;
    
    private String type;

    private long size;
    
    @Column(name = "formatted_size")
    private String formattedSize;
    
    private String path;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = Constants.DATE_FORMAT)
    @Column(name = "upload_date")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Date uploadDate;

    @Column(name = "last_modified")
    private long lastModified;
    
    private int enabled;

    public Document() {}

    public Document (String id, String formattedSize, String downloadPath){
        this.id = id;
        this.formattedSize = formattedSize;
        this.path = downloadPath;
        this.enabled = 1;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTrialId() {
        return this.trialId;
    }

    public void setTrialId(String trialId) {
        this.trialId = trialId;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getSize() {
        return this.size;
    }

    public void setSize(long size) {
        this.size = size;
    }

    public void setFileSize(int size) {
    this.size = size;
    }

    public String getFormattedSize(){
        return this.formattedSize;
    }

    public void setFormattedSize(String formattedSize){
        this.formattedSize = formattedSize;
    }

    public String getPath() {
        return this.path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Date getUploadDate() {
        return this.uploadDate;
    }

    public void setUploadDate(Date uploadDate) {
        this.uploadDate = uploadDate;
    }

    public long getLastModified(){
        return this.lastModified;
    }

    public void setLastModified(long lastModified){
        this.lastModified = lastModified;
    }

    public int getEnabled() {
        return this.enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

    public String getBaselineId() {
        return baselineId;
    }

    public void setBaselineId(String baselineId) {
        this.baselineId = baselineId;
    }

    @Override
    public String toString() {
        return "Document{" +
                "id='" + id + '\'' +
                ", trialId='" + trialId + '\'' +
                ", baselineId='" + baselineId + '\'' +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", size=" + size +
                ", formattedSize='" + formattedSize + '\'' +
                ", path='" + path + '\'' +
                ", uploadDate=" + uploadDate +
                ", lastModified=" + lastModified +
                ", enabled=" + enabled +
                '}';
    }
}
