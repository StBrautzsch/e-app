package de.sb85.eapp.server.services.user.exeptions;

public class UserNotFoundException extends UserException {

    public UserNotFoundException() {

    }

    public UserNotFoundException(String message) {
        super(message);
    }

}
