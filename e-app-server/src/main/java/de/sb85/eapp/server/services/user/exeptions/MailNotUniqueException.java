package de.sb85.eapp.server.services.user.exeptions;

public class MailNotUniqueException extends Exception {

    public MailNotUniqueException() {

    }

    public MailNotUniqueException(String message) {
        super(message);
    }

}
