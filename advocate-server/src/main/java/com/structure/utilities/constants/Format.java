package com.structure.utilities.constants;

public class Format {
    public static final String BAD_CHARACTERS = "[^a-zA-Z0-9-_@.!?*#\\s]+";
    public static final String EMAIL = "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?";
    public static final String PASSWORD = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$";
    public static final String DATE = "^(0?[1-9]|1[0-2])[\\/](0?[1-9]|[12]\\d|3[01])[\\/]\\d{2}$";
}
