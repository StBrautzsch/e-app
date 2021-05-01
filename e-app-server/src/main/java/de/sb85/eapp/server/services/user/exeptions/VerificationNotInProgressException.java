package de.sb85.eapp.server.services.user.exeptions;

public class VerificationNotInProgressException extends VerificationException {

    public VerificationNotInProgressException() {

    }

    public VerificationNotInProgressException(String message) {
        super(message);
    }

}
