package de.sb85.eapp.server.services.user.exeptions;

public class VerificationCodeFailedException extends VerificationException {

    public VerificationCodeFailedException() {

    }

    public VerificationCodeFailedException(String message) {
        super(message);
    }

}
