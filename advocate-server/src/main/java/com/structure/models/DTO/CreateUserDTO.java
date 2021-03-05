package com.structure.models.DTO;

import com.structure.constraints.RequiredFieldConstraint;
import com.structure.constraints.SpecialFormatConstraint;
import com.structure.utilities.constants.Error;
import com.structure.utilities.constants.Format;

public class CreateUserDTO {
    @SpecialFormatConstraint(key = "username", format = Format.EMAIL, message = Error.INVALID_EMAIL)
    private String username;
    @SpecialFormatConstraint(key = "password", format = Format.PASSWORD, message = Error.INSECURE_PASSWORD)
    private String password;
    @RequiredFieldConstraint(key = "firstName")
    private String firstName;
    @RequiredFieldConstraint(key = "lastName")
    private String lastName;

    public CreateUserDTO(){}

    public CreateUserDTO(String username, String password, String firstName, String lastName) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Override
    public String toString() {
        return "CreateUserDTO{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                '}';
    }
}
