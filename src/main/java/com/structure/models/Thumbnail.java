package com.structure.models;

import java.util.Arrays;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "thumbnails", schema = "advocate")
public class Thumbnail {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;

    @Column(name="teacher_id")
    private int teacherId;

    @Column(name="file_name")
    private String fileName;

    @Column(name="file_type")
    private String fileType;

    @Lob
    private byte[] data;
    private int enabled;

    public Thumbnail() {}

    public Thumbnail(int teacherId, String fileName, String fileType, byte[] data, int enabled) {
        this.teacherId = teacherId;
        this.fileName = fileName;
        this.fileType = fileType;
        this.data = data;
        this.enabled = enabled;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(int teacherId) {
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
