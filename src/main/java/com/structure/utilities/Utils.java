package com.structure.utilities;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.structure.models.Teacher;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Arrays;
import java.util.Enumeration;

public class Utils {

    public static boolean hasAcceptableInput(String[] input){
        for (String s : input) {
            if (!s.replaceAll("[^a-zA-Z0-9-_@.!?*#]", "").equals(s))
                return false;
        }
        return true;
    }

    public static boolean isEmpty( Object object ){
        return object == null;
    }

    public static Cookie setSession(HttpServletRequest req, Teacher teacher) {
            HttpSession session = req.getSession();
            session.setAttribute("teacher", teacher);
            System.out.println("User signed in: " + session.getAttribute("teacher").toString());
            Cookie c = new Cookie("email", teacher.getEmail());
            c.setHttpOnly(true);
            c.setMaxAge(-1);
            return c;
    }

    public static Teacher getSessionUser(HttpServletRequest req) {
        Teacher t = (Teacher) req.getSession().getAttribute("teacher");
        Cookie[] emailCookie = Arrays.stream(req.getCookies()).filter(cookie -> cookie.getName().equals("email") && cookie.getValue().equals(t.getEmail())).toArray(Cookie[]::new);

        return (emailCookie.length != 0 ? t : null);
    }

    public static void invalidateSession(HttpServletRequest req){
        req.getSession().invalidate();
        Arrays.stream(req.getCookies()).filter(cookie -> cookie.getName().equals("email")).forEach(cookie -> cookie.setMaxAge(0));
    }

    public static void paramMap(HttpServletRequest req){
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

    public static Gson gson(){
        GsonBuilder builder = new GsonBuilder().excludeFieldsWithoutExposeAnnotation();
        return builder.create();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}