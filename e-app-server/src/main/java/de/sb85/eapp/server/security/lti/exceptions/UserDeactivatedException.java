package de.sb85.eapp.server.security.lti.exceptions;

public class UserDeactivatedException extends Exception {

    public UserDeactivatedException() {

    }

    public UserDeactivatedException(String message) {
        super(message);
    }

}
