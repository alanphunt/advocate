package com.structure.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.structure.config.DateDeserializer;
import com.structure.constraints.BaselineConstraint;
import com.structure.constraints.DateConstraint;
import com.structure.constraints.RequiredFieldConstraint;
import com.structure.utilities.Constants;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "baselines")
@Where(clause = "enabled=1")
@BaselineConstraint
public class Baseline {

    @Id
    private String id;

    @Column(name = "student_id")
    private String studentId;

//    @RequiredFieldConstraint(key = "label")
    private String label;

    private int enabled;

    private String comments;

    @Column(name = "baseline_template")
    private String baselineTemplate;

    @Column(name = "date_started")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = Constants.DATE_FORMAT)
//    @DateConstraint(key = "dateStarted")
    @JsonDeserialize(using = DateDeserializer.class)
    private Date dateStarted;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "student_id", updatable = false, insertable = false)
    private Student student;

    @OneToOne(mappedBy = "baseline", cascade = {CascadeType.ALL})
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
//    @Valid
    private Tracking tracking;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OneToMany(mappedBy = "baseline", cascade = CascadeType.ALL)
    private List<Document> documents = new ArrayList<>();

    @Transient
//    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private ArrayList<String> documentIds = new ArrayList<>();

    @Transient
//    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String trackingId;

    public Baseline(){}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public int getEnabled() {
        return enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getBaselineTemplate() {
        return baselineTemplate;
    }

    public void setBaselineTemplate(String baselineTemplate) {
        this.baselineTemplate = baselineTemplate;
    }

    public Date getDateStarted() {
        return dateStarted;
    }

    public void setDateStarted(Date dateStarted) {
        this.dateStarted = dateStarted;
    }

    public Tracking getTracking() {
        return tracking;
    }

    public void setTracking(Tracking tracking) {
        this.tracking = tracking;
    }

    public List<Document> getDocuments() {
        return documents;
    }

    public void setDocuments(List<Document> documents) {
        this.documents = documents;
    }

    public ArrayList<String> getDocumentIds() {
        return documentIds;
    }

    public void setDocumentIds(ArrayList<String> documentIds) {
        this.documentIds = documentIds;
    }

    public String getTrackingId() {
        return trackingId;
    }

    public void setTrackingId(String trackingId) {
        this.trackingId = trackingId;
    }

    @Override
    public String toString() {
        return "Baseline{" +
                "id='" + id + '\'' +
                ", studentId='" + studentId + '\'' +
                ", label='" + label + '\'' +
                ", enabled=" + enabled +
                ", comments='" + comments + '\'' +
                ", baselineTemplate='" + baselineTemplate + '\'' +
                ", dateStarted=" + dateStarted +
                ", tracking=" + tracking +
                ", trackingId=" + trackingId +
                ", documentIds=" + documentIds +
                ", documents=" + documents +
                '}';
    }
}
