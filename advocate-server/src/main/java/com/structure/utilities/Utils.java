package com.structure.utilities;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.*;
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



}