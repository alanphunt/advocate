package com.structure.utilities;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.structure.models.*;
import com.structure.models.DTO.TeacherDTO;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.text.StringEscapeUtils;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.*;

@Component
public class Utils {

    public void paramMap(HttpServletRequest req){
        Enumeration<String> params = req.getParameterNames();
        Enumeration<String> headerNames = req.getHeaderNames();

        while(params.hasMoreElements()){
            String paramName = params.nextElement();
            System.out.println("Parameter Name - "+paramName+", Value - "+req.getParameter(paramName));
        }
        while(headerNames.hasMoreElements()){
            String headerName = headerNames.nextElement();
            System.out.println("Header Name - " + headerName + ", Value - " + req.getHeader(headerName));
        }
    }

    public String generateUniqueId() {
        return RandomStringUtils.randomAlphanumeric(11);
    }

    public <T> T fromJSON(final TypeReference<T> type, String jsonPacket) throws Exception {
        return new ObjectMapper().readValue(jsonPacket, type);
    }

    public String escape(String text){
        return StringEscapeUtils.escapeJava(text);
    }

    public boolean richTextFieldIsEmpty(String text){
        return text.contains("\"text\":\"\",\"type\":\"");
    }

    public Optional<Date> parseDate(String dateString){
        SimpleDateFormat sdf = new SimpleDateFormat(Constants.DATE_FORMAT);
        Date date;
        try{
            if(!dateString.isBlank())
                date = sdf.parse(dateString);
            else
                throw new Exception("Empty date");
        }catch(Exception e){
            System.out.println("failed to parse date");
            return Optional.empty();
        }
        return Optional.of(date);
    }

    public TeacherDTO mapTeacherToTeacherDTO(AccountDetails details) {
        TeacherDTO dto = new TeacherDTO();
        details.setRole(details.getAuthorities().get(0).getAuthority());
        dto.setAccountDetails(details);
        dto.setTeacher(details.getTeacher());
        Teacher teacher = dto.getTeacher();

        Map<String, Classroom> classrooms = new HashMap<>();
        Map<String, Student> students = new HashMap<>();
        Map<String, Baseline> baselines = new HashMap<>();
        Map<String, Goal> goals = new HashMap<>();
        Map<String, Benchmark> benchmarks = new HashMap<>();
        Map<String, Trial> trials = new HashMap<>();
        Map<String, Tracking> trackings = new HashMap<>();
        Map<String, TrackingMeta> trackingMeta = new HashMap<>();
        Map<String, Document> documents = new HashMap<>();

        for(Classroom c : teacher.getClassrooms()){
            classrooms.put(c.getId(), c);
            dto.getTeacher().getClassroomIds().add(c.getId());
            for(Student s : c.getStudents()){
                c.getStudentIds().add(s.getId());
                students.put(s.getId(), s);
                for(Baseline b : s.getBaselines()){
                    baselines.put(b.getId(), b);
                    s.getBaselineIds().add(b.getId());
                    for(Document bd : b.getDocuments()){
                        documents.put(bd.getId(), bd);
                        b.getDocumentIds().add(bd.getId());
                    }
                    if(b.getTracking() != null) {
                        Tracking tracking = b.getTracking();
                        trackings.put(tracking.getId(), tracking);
                        b.setTrackingId(tracking.getId());
                        for (TrackingMeta trm : tracking.getTrackingMeta()) {
                            tracking.getTrackingMetaIds().add(trm.getId());
                            trackingMeta.put(trm.getId(), trm);
                        }
                    }
                }
                for(Goal g : s.getGoals()){
                    s.getGoalIds().add(g.getId());
                    goals.put(g.getId(), g);
                    for(Benchmark b : g.getBenchmarks()){
                        g.getBenchmarkIds().add(b.getId());
                        benchmarks.put(b.getId(), b);
                        for(Trial t : b.getTrials()){
                            b.getTrialIds().add(t.getId());
                            trials.put(t.getId(), t);
                            if(t.getTracking() != null) {
                                Tracking trialTracking = t.getTracking();
                                trackings.put(trialTracking.getId(), trialTracking);
                                t.setTrackingId(trialTracking.getId());
                                for (TrackingMeta trm : trialTracking.getTrackingMeta()) {
                                    trialTracking.getTrackingMetaIds().add(trm.getId());
                                    trackingMeta.put(trm.getId(), trm);
                                }
                            }
                            for(Document d : t.getDocuments()){
                                t.getDocumentIds().add(d.getId());
                                documents.put(d.getId(), d);
                            }
                        }
                    }
                }
            }
        }

        dto.setClassrooms(classrooms);
        dto.setStudents(students);
        dto.setBaselines(baselines);
        dto.setGoals(goals);
        dto.setBenchmarks(benchmarks);
        dto.setTrials(trials);
        dto.setTrackings(trackings);
        dto.setTrackingMeta(trackingMeta);
        dto.setDocuments(documents);
        return dto;
    }


}