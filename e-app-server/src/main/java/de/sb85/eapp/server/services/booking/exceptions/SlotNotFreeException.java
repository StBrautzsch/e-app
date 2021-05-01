package de.sb85.eapp.server.services.booking.exceptions;

public class SlotNotFreeException extends Exception {

    public SlotNotFreeException() {

    }

    public SlotNotFreeException(String message) {
        super(message);
    }

}
