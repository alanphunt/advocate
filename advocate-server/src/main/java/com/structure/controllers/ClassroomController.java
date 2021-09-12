package com.structure.controllers;

import com.structure.models.Classroom;
import com.structure.utilities.AccountDetailsRequestBean;
import com.structure.utilities.Constants;
import com.structure.services.ClassroomService;
import com.structure.services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping(path=Constants.API_PATH)
@Validated
public class ClassroomController {

    @Autowired
    private ClassroomService crs;

    @Autowired
    private LoginService ls;

    @Autowired
    private AccountDetailsRequestBean detailsBean;

    @PostMapping(value="/createclassroom")
    public ResponseEntity<?> createClassroom(@Valid @RequestBody Classroom classroom){
        classroom.setTeacherId(detailsBean.getAccountDetails().getTeacherId());
        crs.handleClassroomCreation(classroom);
        return ls.handleTeacherRehydration();
    }

    @DeleteMapping(value = "/deleteclassroom")
    public ResponseEntity<?> deleteClassroom(String classroomId){
        crs.deleteClassroom(classroomId);
        return ls.handleTeacherRehydration();
    }

    @PutMapping(value = "/updateclassroom")
    public ResponseEntity<?> updateClassroom(@RequestBody Classroom body){
        Map<String, String> errors = crs.updateClassroomOrReturnErrors(body);

        if(errors.size() == 0)
            return ls.handleTeacherRehydration();

        return ResponseEntity.status(Constants.HTTP_BAD_REQUEST).body(errors);

    }


}
