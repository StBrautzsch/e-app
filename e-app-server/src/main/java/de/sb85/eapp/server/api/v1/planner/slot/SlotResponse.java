package de.sb85.eapp.server.api.v1.planner.slot;

import de.sb85.eapp.server.services.slot.data.Slot;
import de.sb85.eapp.server.services.user.UserService;
import de.sb85.eapp.server.services.user.data.User;

import java.util.ArrayList;
import java.util.Date;

public class SlotResponse {

    private final Integer id;
    private final Date start;
    private final Integer duration;
    private final Boolean isFree;
    private Boolean isClientAuth = false;
    private Boolean isClientAnonym = false;

    private String bookingRemark = "";
    private String bookingClientPreName = "";
    private String bookingClientName = "";
    private String bookingClientMail = "";
    private String bookingClientTel = "";

    public static ArrayList<SlotResponse> transfer(Iterable<Slot> input, UserService userService) {
        ArrayList<SlotResponse> ret = new ArrayList<>();
        input.forEach(slot -> ret.add(new SlotResponse(slot, userService)));
        return ret;
    }

    public SlotResponse(Slot slot, UserService userService) {
        id = slot.getId();
        start = slot.getStart();
        duration = slot.getDuration();
        isFree = slot.isFree();
        if (!isFree) {
            transferClient(slot, userService);
        }
    }

    private void transferClient(Slot slot, UserService userService) {
        isClientAuth = slot.getBooking().isClientAuth();
        isClientAnonym = slot.getBooking().isClientAnonym();
        bookingRemark = slot.getBooking().getRemark();
        transferAuthClient(slot, userService);
        transferAnonymClient(slot);
    }

    private void transferAnonymClient(Slot slot) {
        if (slot.getBooking().isClientAnonym()) {
            bookingClientName = slot.getBooking().getAnonymClient().getName();
            bookingClientMail = slot.getBooking().getAnonymClient().getMail();
            bookingClientTel = slot.getBooking().getAnonymClient().getTel();
        }
    }

    private void transferAuthClient(Slot slot, UserService userService) {
        if (slot.getBooking().isClientAuth()) {
            User user = userService.findUserByClient(slot.getBooking().getAuthClient());
            bookingClientPreName = user.getPreName();
            bookingClientName = user.getName();
            bookingClientMail = user.getMail();
            bookingClientTel = user.getTel();
        }
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

    public Boolean getFree() {
        return isFree;
    }

    public Boolean getClientAuth() {
        return isClientAuth;
    }

    public Boolean getClientAnonym() {
        return isClientAnonym;
    }

    public String getBookingRemark() {
        return bookingRemark;
    }

    public String getBookingClientPreName() {
        return bookingClientPreName;
    }

    public String getBookingClientName() {
        return bookingClientName;
    }

    public String getBookingClientMail() {
        return bookingClientMail;
    }

    public String getBookingClientTel() {
        return bookingClientTel;
    }

}
