package com.structure.config;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.structure.utilities.Constants;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class DateDeserializer extends JsonDeserializer<Date> {

    private SimpleDateFormat dateFormat = new SimpleDateFormat(Constants.DATE_FORMAT);

    @Override
    public Date deserialize(JsonParser paramJsonParser, DeserializationContext paramDeserializationContext) throws IOException, JsonProcessingException {
        String str = paramJsonParser.getText().trim();
        Date d = new Date();
        if(str.isBlank()){
            d.setTime(0);
        }else {
            try {
                dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
                return dateFormat.parse(str);
            } catch (Exception e) {
                System.out.println("bad date format");
            }
            d.setTime(-1);
        }
        return d;
    }
}