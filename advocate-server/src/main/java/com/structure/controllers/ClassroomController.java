package com.structure.controllers;

import com.structure.models.Classroom;
import com.structure.utilities.Constants;
import com.structure.services.ClassroomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;

@RestController
@RequestMapping(path=Constants.API_PATH)
@Validated
public class ClassroomController {

  @Autowired
  private ClassroomService crs;

  @PostMapping(value="/createclassroom")
  public ResponseEntity<?> createClassroom(@Valid @RequestBody Classroom classroom){
    return ResponseEntity.ok(crs.handleClassroomCreation(classroom));
  }

  @DeleteMapping(value = "/deleteclassroom")
  public ResponseEntity<?> deleteClassroom(String classroomId){
    crs.deleteClassroom(classroomId);
    return ResponseEntity.ok(new HashMap<>());
  }

  @PutMapping(value = "/updateclassroom")
  public ResponseEntity<?> updateClassroom(@Valid @RequestBody Classroom body){
    return ResponseEntity.ok(crs.handleClassroomUpdate(body));
  }

}
