package com.structure.models;

import java.util.Arrays;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "thumbnails", schema = "advocate")
public class Thumbnail {
    @Id
    private String id;

    @Column(name="teacher_id")
    private String teacherId;

    @Column(name="file_name")
    private String fileName;

    @Column(name="file_type")
    private String fileType;

    @Lob
    private byte[] data;
    private int enabled;

    public Thumbnail() {}

    public Thumbnail(String teacherId, String fileName, String fileType, byte[] data, int enabled) {
        this.teacherId = teacherId;
        this.fileName = fileName;
        this.fileType = fileType;
        this.data = data;
        this.enabled = enabled;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public int getEnabled() {
        return enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

    @Override
    public String toString() {
        return "Picture [id=" + id + ", teacherId=" + teacherId + ", fileName=" + fileName + ", fileType=" + fileType + ", data="
                + Arrays.toString(data) + ", enabled=" + enabled + "]";
    }
}
