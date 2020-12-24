package com.structure.utilities;

public class Constants {

    public static final String API_PATH = "/api";
    //REGEXS
    public static final String GENERIC_BAD_TEXT_REGEX = "[^a-zA-Z0-9-_@.!?*#\\s]+";
    public static final String EMAIL_REGEX = "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?";
    public static final String PASSWORD_REGEX = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$";
    public static final String DATE_REGEX = "^(0?[1-9]|1[0-2])[\\/](0?[1-9]|[12]\\d|3[01])[\\/](19|20)\\d{2}$";

    //ERROR RESPONSES
    public static final String CLASSNAME_EMPTY_RESPONSE = "Ensure class name is filled out properly.";
    public static final String STUDENTS_EMPTY_RESPONSE = "Ensure all student fields are filled out properly.";
    public static final String BENCHMARKS_EMPTY_RESPONSE = "Ensure all benchmark fields are filled out properly.";
    public static final String INSECURE_PASSWORD_RESPONSE = "Password must contain a special character, a number, an upper and lower case letter, and must be 8+ characters long.";
    public static final String EMPTY_FIELD_RESPONSE = "This field is required.";
    public static final String INVALID_EMAIL_RESPONSE = "Please enter a valid email.";
    public static final String INVALID_DATE_FORMAT = "Dates must be in MM/dd/yyyy format.";

    public static final int COOKIE_LIFE_SECONDS = 60 * 60 * 3;
    public static final int COOKIE_LIFE_MS = 1000 * COOKIE_LIFE_SECONDS;

    public static final int HTTP_UNAUTHORIZED = 401;
    public static final int HTTP_FORBIDDEN = 403;
    public static final int HTTP_BAD_REQUEST = 400;
}
