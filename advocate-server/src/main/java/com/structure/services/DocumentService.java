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

import com.structure.models.Baseline;
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

    public Document handleDocumentUpload(HttpServletRequest request, MultipartFile file, Class<?> clazz, String parentId, Document existingDoc) throws IOException{
        System.out.println("generating document meta..");
        String filePath = generateUploadPath(request, parentId);
        File newFile = new File(filePath);
        newFile.mkdirs();

        String downloadPath = filePath.split("/", 3)[2] + existingDoc.getName();
        existingDoc.setId(util.generateUniqueId());
        existingDoc.setPath(downloadPath);
        existingDoc.setEnabled(1);
        existingDoc.setFormattedSize(convertFileSize(existingDoc.getSize()));

        if(clazz == Trial.class){
            if(existingDoc.getTrialId().isBlank()) {
                existingDoc.setTrialId(parentId);
                existingDoc.setBaselineId(null);
            }
        }else if(clazz == Baseline.class){
            if(existingDoc.getBaselineId().isBlank()) {
                existingDoc.setBaselineId(parentId);
                existingDoc.setTrialId(null);
            }
        }

        Path path = Paths.get(generateUploadPath(request, parentId) + file.getOriginalFilename());
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        Files.createDirectories(path.getParent());

        System.out.println("Finalized metadata:");
        return existingDoc;
    }

    private String generateUploadPath(HttpServletRequest request, String trialId){
        String email = jwtService.extractJwtAndEmailFromCookie(request);
        return Constants.DOCUMENT_UPLOAD_PATH + email + "/" + trialId + "/";
    }

    /*
        when you edit a trial/baseline this function compares what docs are in the database against what meta is sent from the client
        and deletes the one that were deleted on the client side
     */
    public void deleteOldFileIfNecessary(Trial trial){
        System.out.println("deleting old files if necessary..");
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
            }else
                System.out.println("No files to delete.");
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

    public void handleDocuments(List<Document> documents, String id, Class<?> clazz, List<MultipartFile> newFiles, HttpServletRequest req){
        System.out.println("Begin handling documents..");
        for(Document docMeta : documents){
            System.out.println(docMeta.toString());
            if(newFiles != null){
                for(MultipartFile docFile : newFiles){
                    System.out.println(docFile.toString());
                    if(docFile.getOriginalFilename().equals(docMeta.getName())){
                        System.out.println("File names match");
                        try{
                            handleDocumentUpload(req, docFile, clazz, id, docMeta);
                        }catch(IOException io){
                            System.out.println(io.getMessage());
                        }
                    }else{
                        System.out.println("File names do not match.");
                    }
                }
            }
            else{
                System.out.println("no uploaded files attached to request");
            }
        }
    }

    //this deletes all trial documents when you delete a trial
    public void deleteAllServerFilesById(String id, HttpServletRequest request){
        String filepath = generateUploadPath(request, id);
        File file = new File(filepath);
        File[] files = file.listFiles();
        if(files != null) {
            for (File f : files) {
                if(f.delete())
                    System.out.println("successfully deleted file");
                else
                    System.out.println("Could not delete file");
            }
            if(file.delete())
                System.out.println("deleted directory");
        }
    }
}
