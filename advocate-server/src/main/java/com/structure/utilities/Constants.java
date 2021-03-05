package com.structure.utilities;

import org.springframework.http.HttpStatus;

public class Constants {

    public static final String API_PATH = "/api";
    public static final String DATE_FORMAT = "MM/dd/yy";

    //ERROR RESPONSES
    public static final String SERVER_ERROR = "Authentication failed, please log back in to continue.";
    public static final String CLASSNAME_EMPTY_RESPONSE = "Ensure class name is filled out properly.";
    public static final String STUDENTS_EMPTY_RESPONSE = "Ensure all student fields are filled out properly.";
    public static final String NO_STUDENTS_RESPONSE = "Classrooms must have at least one student.";
    public static final String BENCHMARKS_EMPTY_RESPONSE = "Ensure all benchmark fields are filled out properly and dates are formatted as MM/dd/yy.";
    public static final String NO_BENCHMARKS_RESPONSE = "Goal must contain at least one benchmark.";
    public static final String INSECURE_PASSWORD_RESPONSE = "Password must contain a special character, a number, an upper and lower case letter, and must be 8+ characters long.";
    public static final String EMPTY_FIELD_RESPONSE = "This field is required.";
    public static final String INVALID_EMAIL_RESPONSE = "Please enter a valid email.";
    public static final String INVALID_DATE_FORMAT = "Dates must be in MM/dd/yy format.";
    public static final String EMPTY_TRACK_LABEL_RESPONSE = "Please ensure all tracks have a label.";
    public static final String NUMBER_FORMAT_ERROR_RESPONSE = "Fields must be a positive number.";
    public static final String NUMERATOR_LESS_THAN_DENOMINATOR_RESPONSE = "Numerator must be greater than the denominator.";

    public static final int COOKIE_LIFE_SECONDS = 60 * 60 * 3;
    public static final int COOKIE_LIFE_MS = 1000 * COOKIE_LIFE_SECONDS;

    public static final int HTTP_OK = HttpStatus.OK.value();
    public static final int HTTP_BAD_REQUEST = HttpStatus.BAD_REQUEST.value();
    public static final int HTTP_UNAUTHORIZED = HttpStatus.UNAUTHORIZED.value();
    public static final int HTTP_FORBIDDEN = HttpStatus.FORBIDDEN.value();

    //FILE 
    public static final String DOCUMENT_UPLOAD_PATH = "c:/advocatedocuments/";
    public static final String DOCUMENT_UPLOAD_FAIL_RESPONSE = "File upload failed. Please ensure the total file sizes are < 23MB, there are no unusual characters in the filename, and that the filename is < 50 characters.";
    public static final String FAILED_FILE_READ = "Unable to read file from the server. Please try again.";
    public static final int FILE_UPLOAD_LIMIT = 15;

}
