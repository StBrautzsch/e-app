package de.sb85.eapp.server.api.v1.booking;

import de.sb85.eapp.server.services.slot.data.Slot;

import java.util.ArrayList;
import java.util.Date;

public class BookingSlotResponse {

    private Integer id;
    private Date start;
    private Integer duration;

    public static ArrayList<BookingSlotResponse> transfer(Iterable<Slot> input) {
        ArrayList<BookingSlotResponse> ret = new ArrayList<>();
        input.forEach(slot -> ret.add(new BookingSlotResponse(slot)));
        return ret;
    }

    public BookingSlotResponse() {

    }

    public BookingSlotResponse(Slot slot) {
        id = slot.getId();
        start = slot.getStart();
        duration = slot.getDuration();
    }

    public Integer getId() {
        return id;
    }

    public String getStart() {
        return start.toInstant().toString();
    }

    public Integer getDuration() {
        return duration;
    }

}
