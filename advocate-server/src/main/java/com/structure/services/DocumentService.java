package com.structure.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.structure.models.Document;
import com.structure.models.Trial;
import com.structure.repositories.DocumentRepo;
import com.structure.utilities.Constants;
import com.structure.utilities.Utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class DocumentService {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private Utils util;

    @Autowired
    private DocumentRepo docRepo;

    public Document handleDocumentUpload(HttpServletRequest request, MultipartFile file, String trialId, Document existingDoc) throws IOException{
        System.out.println("generating document meta..");

        String filePath = generateUploadPath(request, trialId);
        File newFile = new File(filePath);
        newFile.mkdirs();

        String downloadPath = filePath.split("/", 3)[2] + existingDoc.getName();
        existingDoc.setId(util.generateUniqueId());
        existingDoc.setPath(downloadPath);
        existingDoc.setEnabled(1);
        existingDoc.setFormattedSize(convertFileSize(existingDoc.getSize()));
        if(existingDoc.getTrialId().isBlank())
            existingDoc.setTrialId(trialId);

        Path path = Paths.get(generateUploadPath(request, trialId) + file.getOriginalFilename());
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        Files.createDirectories(path.getParent());

        System.out.println("Finalized metadata:");
        return existingDoc;
    }

    private String generateUploadPath(HttpServletRequest request, String trialId){
        String email = jwtService.extractJwtAndEmailFromCookie(request);
        return Constants.DOCUMENT_UPLOAD_PATH + email + "/" + trialId + "/";
    }

    public void deleteOldFileIfNecessary(Trial trial){
        String trialId = trial.getId();
        List<Document> documentsFromRequest = trial.getDocuments();
        ArrayList<Document> existingDocs = docRepo.findAllByTrialId(trialId);
        for(Document existingDoc : existingDocs){
            boolean deleteFlag = true;
            for(Document docFromRequest : documentsFromRequest){
                if(docFromRequest.getName().equals(existingDoc.getName()))
                    deleteFlag = false;
            }
            if(deleteFlag){
                File file = new File(Constants.DOCUMENT_UPLOAD_PATH + existingDoc.getPath());
                if(file.delete()){
                    System.out.println("Successfully deleted file " + existingDoc.getName());
                }else{
                    System.out.println("Could not delete file " + existingDoc.getName());
                }
            }
        }
    }

    private String convertFileSize(long fileSize){
        DecimalFormat df = new DecimalFormat("###.0");
        String size = "";
		if(fileSize < 1024){
			size = (fileSize == 0 ? "N/A" : fileSize + " B");
		}else if(fileSize < 1048576){
			size = df.format(fileSize/1024) + " KB";
		}else if(fileSize < 1073741824){
			size = df.format(fileSize/1048576) + " MB";
		}else {
			size = df.format(fileSize / 1073741824) + " GB";
        }
		return size;
    }

    public ResponseEntity<?> handleDocumentBytesRetrieval(String path, String name, String type){
        Map<String, String> error = new HashMap<String, String>();
        try{
            String fullPath = Constants.DOCUMENT_UPLOAD_PATH + path;
            byte[] bytes = Files.readAllBytes(Paths.get(fullPath));

            return ResponseEntity                
                .ok()
                .contentType(MediaType.parseMediaType(type))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + name + "\"")
                .body(bytes);
        }catch(Exception e){
            error.put("error", Constants.FAILED_FILE_READ);
        }
        return ResponseEntity.badRequest().body(error);
    }

}
