package com.structure.utilities;

import com.google.gson.*;
import org.apache.commons.lang3.RandomStringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

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
        GsonBuilder builder = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().setDateFormat("MM/dd/yyyy");
        return builder.create();
    }

    public static String generateUniqueId() {
        return RandomStringUtils.randomAlphanumeric(11);
    }

}