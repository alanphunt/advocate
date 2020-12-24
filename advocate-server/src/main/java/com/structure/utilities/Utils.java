package com.structure.utilities;

import com.google.gson.*;
import com.google.gson.reflect.TypeToken;
import com.structure.models.*;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.text.StringEscapeUtils;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Type;
import java.util.*;

@Component
public class Utils {

    public static boolean acceptableInput(String[] input){
        for (String s : input) {
            if (!s.replaceAll("[^a-zA-Z0-9-_@.!?*#]", "").equals(s))
                return true;
        }
        return false;
    }

    public static boolean isEmpty( Object object ){
        return object == null;
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
        GsonBuilder builder = new GsonBuilder()
                .excludeFieldsWithoutExposeAnnotation()
                .setDateFormat("MM/dd/yyyy");
        return builder.create();
    }

    public static Optional<Cookie> extractJwtFromCookie (HttpServletRequest request) throws NoSuchElementException {
        if(request.getCookies() == null)
            return Optional.empty();

         return Arrays.stream(request.getCookies()).filter(cookie ->
                 cookie.getName().equals("jwt")).findFirst();
    }

    public static String generateUniqueId() {
        return RandomStringUtils.randomAlphanumeric(11);
    }

    public static Type getListType(Class<?> clazz){
        if(clazz == Classroom.class)
            return new TypeToken<ArrayList<Classroom>>() {}.getType();
        else if(clazz == Student.class)
            return new TypeToken<ArrayList<Student>>() {}.getType();
        else if(clazz == Goal.class)
            return new TypeToken<ArrayList<Goal>>() {}.getType();
        else if(clazz == Benchmark.class)
            return new TypeToken<ArrayList<Benchmark>>() {}.getType();
        else if(clazz == Trial.class)
            return new TypeToken<ArrayList<Trial>>() {}.getType();
        else
            return new TypeToken<ArrayList<Tracking>>() {}.getType();
    }

    public static String escape(String text){
        return StringEscapeUtils.escapeJava(text);
    }

    public static void createAndAddJwtToCookie(String JWT, HttpServletResponse res){
        Cookie cookie = new Cookie("jwt", JWT);
        cookie.setMaxAge(Constants.COOKIE_LIFE_SECONDS);
        cookie.setHttpOnly(true);
        //cookie.setSecure(true);
        res.addCookie(cookie);
    }

}