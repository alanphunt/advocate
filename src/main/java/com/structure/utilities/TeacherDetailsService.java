package com.structure.utilities;

import com.structure.models.Teacher;
import com.structure.repositories.TeacherRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class TeacherDetailsService implements UserDetailsService {
    @Autowired
    private TeacherRepo tr;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return tr.findTeacherByUsernameAndEnabled(username, 1);
    }

    public Teacher saveTeacher(Teacher teacher){
        return tr.save(teacher);
    }
}
