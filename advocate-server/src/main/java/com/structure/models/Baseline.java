package com.structure.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.structure.utilities.Constants;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "baselines")
@Where(clause = "enabled=1")
public class Baseline {

    @Id
    private String id;

    @Column(name = "student_id")
    private String studentId;

    private String label;

    private int enabled;

    private String comments;

    @Column(name = "baseline_template")
    private String baselineTemplate;

    @Column(name = "date_started")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = Constants.DATE_FORMAT)
    private Date dateStarted;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "student_id", updatable = false, insertable = false)
    private Student student;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OneToMany(mappedBy = "baseline", cascade = CascadeType.ALL)
    private List<Tracking> trackings = new ArrayList<>();

    @Transient
    private ArrayList<String> trackingIds = new ArrayList<>();

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OneToMany(mappedBy = "baseline", cascade = CascadeType.ALL)
    private List<Document> documents = new ArrayList<>();

    @Transient
    private ArrayList<String> documentIds = new ArrayList<>();

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

    public List<Tracking> getTrackings() {
        return trackings;
    }

    public void setTrackings(List<Tracking> trackings) {
        this.trackings = trackings;
    }

    public ArrayList<String> getTrackingIds() {
        return trackingIds;
    }

    public void setTrackingIds(ArrayList<String> trackingIds) {
        this.trackingIds = trackingIds;
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
                ", trackingIds=" + trackingIds +
                ", trackings=" + trackings +
                ", documentIds=" + documentIds +
                ", documents=" + documents +
                '}';
    }
}
