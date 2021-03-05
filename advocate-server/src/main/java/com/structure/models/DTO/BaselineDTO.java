package com.structure.models.DTO;

import com.structure.models.Baseline;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;

public class BaselineDTO {

    private Baseline baseline;

    private ArrayList<MultipartFile> documents;

    public BaselineDTO() {}

    public Baseline getBaseline() {
        return baseline;
    }

    public void setBaseline(Baseline baseline) {
        this.baseline = baseline;
    }

    public ArrayList<MultipartFile> getDocuments() {
        return documents;
    }

    public void setDocuments(ArrayList<MultipartFile> documents) {
        this.documents = documents;
    }
}
