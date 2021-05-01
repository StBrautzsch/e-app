package de.sb85.eapp.server.services.user.exeptions;

public class UserNotClientException extends UserException {

    public UserNotClientException() {

    }

    public UserNotClientException(String message) {
        super(message);
    }

}
