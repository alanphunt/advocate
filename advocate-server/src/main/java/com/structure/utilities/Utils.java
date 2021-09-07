package com.structure.utilities;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.*;
import com.structure.models.*;
import com.structure.models.DTOs.TeacherDTO;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.text.StringEscapeUtils;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Component
public class Utils {

  public boolean acceptableInput(String[] input){
    for (String s : input) {
      if (!s.replaceAll("[^a-zA-Z0-9-_@.!?*#]", "").equals(s))
        return true;
    }
    return false;
  }

  public boolean isEmpty( Object object ){
    return object == null;
  }

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

  public Gson gson(){
    GsonBuilder builder = new GsonBuilder()
        .excludeFieldsWithoutExposeAnnotation()
        .setDateFormat(Constants.DATE_FORMAT);
    return builder.create();
  }

  public String generateUniqueId() {
    return RandomStringUtils.randomAlphanumeric(15);
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

  public TeacherDTO mapTeacherToTeacherDTO(Teacher teacher) {
    TeacherDTO dto = new TeacherDTO();
    System.out.println(teacher.toString());
    dto.setTeacher(teacher);
    dto.getTeacher().setClassroomIds(new ArrayList<>());

    Map<String, Classroom> classrooms = new HashMap<>();
    Map<String, Student> students = new HashMap<>();
    Map<String, Goal> goals = new HashMap<>();
    Map<String, Benchmark> benchmarks = new HashMap<>();
    Map<String, Trial> trials = new HashMap<>();
    Map<String, Tracking> trackings = new HashMap<>();
    Map<String, Document> documents = new HashMap<>();
    for(Classroom c : teacher.getClassrooms()){
      classrooms.put(c.getId(), c);
      dto.getTeacher().getClassroomIds().add(c.getId());
      for(Student s : c.getStudents()){
        c.getStudentIds().add(s.getId());
        students.put(s.getId(), s);
        for(Goal g : s.getGoals()){
          s.getGoalIds().add(g.getId());
          goals.put(g.getId(), g);
          for(Benchmark b : g.getBenchmarks()){
            g.getBenchmarkIds().add(b.getId());
            benchmarks.put(b.getId(), b);
            for(Trial t : b.getTrials()){
              b.getTrialIds().add(t.getId());
              trials.put(t.getId(), t);
              for(Tracking tr : t.getTrackings()){
                t.getTrackingIds().add(tr.getId());
                trackings.put(tr.getId(), tr);
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
    dto.setGoals(goals);
    dto.setBenchmarks(benchmarks);
    dto.setTrials(trials);
    dto.setTrackings(trackings);
    dto.setDocuments(documents);
    return dto;
  }

}