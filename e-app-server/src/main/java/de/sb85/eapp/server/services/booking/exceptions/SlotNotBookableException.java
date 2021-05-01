package de.sb85.eapp.server.services.booking.exceptions;

public class SlotNotBookableException extends Exception {

    public SlotNotBookableException() {

    }

    public SlotNotBookableException(String message) {
        super(message);
    }

}
