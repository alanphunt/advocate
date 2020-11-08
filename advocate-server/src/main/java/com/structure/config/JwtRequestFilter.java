package com.structure.config;

import com.structure.models.Teacher;
<<<<<<< HEAD:advocate-server/src/main/java/com/structure/config/JwtRequestFilter.java
import com.structure.services.JWTService;
import com.structure.services.TeacherDetailsService;
import com.structure.utilities.Utils;
=======
import com.structure.repositories.TeacherRepo;
import com.structure.services.JWTService;
import com.structure.services.TeacherDetailsService;
>>>>>>> a95f801ec3a4c1b1baef8efb874e845b688000e5:src/main/java/com/structure/utilities/JwtRequestFilter.java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired private JWTService JWT_UTIL;
    @Autowired private TeacherDetailsService TDS;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        System.out.println("Filtering incoming request..");
        Optional<Cookie> jwtCookie = Utils.extractJwtFromCookie(httpServletRequest);
        String username = null;
        String jwt = null;
<<<<<<< HEAD:advocate-server/src/main/java/com/structure/config/JwtRequestFilter.java
        try {
            if (jwtCookie.isPresent()) {
                jwt = jwtCookie.get().getValue();
=======
        //try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                jwt = authHeader.substring(7);
>>>>>>> a95f801ec3a4c1b1baef8efb874e845b688000e5:src/main/java/com/structure/utilities/JwtRequestFilter.java
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
<<<<<<< HEAD:advocate-server/src/main/java/com/structure/config/JwtRequestFilter.java
        } catch(Exception e){
            System.out.println(e.getMessage());
            httpServletResponse.sendError(403);
        }
=======
/*        } catch(Exception e){
            httpServletResponse.setHeader("error", "JWT exception, please log back in.");
            httpServletResponse.setStatus(403);
        }*/
>>>>>>> a95f801ec3a4c1b1baef8efb874e845b688000e5:src/main/java/com/structure/utilities/JwtRequestFilter.java
    }
}