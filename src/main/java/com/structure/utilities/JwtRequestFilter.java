package com.structure.utilities;

import com.structure.models.Teacher;
import com.structure.repositories.TeacherRepo;
import com.structure.services.JWTService;
import com.structure.services.TeacherDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired private JWTService JWT_UTIL;
    @Autowired private TeacherDetailsService TDS;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = httpServletRequest.getHeader("Authorization");
        String username = null;
        String jwt = null;
        //try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                jwt = authHeader.substring(7);
                username = JWT_UTIL.extractEmail(jwt);
            }

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                Teacher teacher = (Teacher) TDS.loadUserByUsername(username);
                if (JWT_UTIL.validateToken(jwt, teacher)) {
                    UsernamePasswordAuthenticationToken upat = new UsernamePasswordAuthenticationToken(teacher, null, teacher.getAuthorities());
                    upat.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                    SecurityContextHolder.getContext().setAuthentication(upat);
                }
            }

            filterChain.doFilter(httpServletRequest, httpServletResponse);
/*        } catch(Exception e){
            httpServletResponse.setHeader("error", "JWT exception, please log back in.");
            httpServletResponse.setStatus(403);
        }*/
    }
}