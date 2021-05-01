package de.sb85.eapp.server.api.v1;

import de.sb85.eapp.server.services.slot.data.Slot;
import de.sb85.eapp.server.services.user.UserService;
import de.sb85.eapp.server.services.user.data.User;

import java.util.ArrayList;
import java.util.Date;

public class AppointmentResponse {

    private final Integer id;
    private final Date start;
    private final Integer duration;
    private final String bookingRemark;
    private final String bookingPlannerPreName;
    private final String bookingPlannerName;
    private final String bookingPlannerMail;
    private final String bookingPlannerTel;

    public static ArrayList<AppointmentResponse> transfer(Iterable<Slot> input, UserService userService) {
        ArrayList<AppointmentResponse> ret = new ArrayList<>();
        input.forEach(slot -> ret.add(new AppointmentResponse(slot, userService)));
        return ret;
    }

    public AppointmentResponse(Slot slot, UserService userService) {
        User plannerUser = userService.findUserByPlanner(slot.getPlanner());
        id = slot.getId();
        start = slot.getStart();
        duration = slot.getDuration();
        bookingRemark = slot.getBooking().getRemark();
        bookingPlannerPreName = plannerUser.getPreName();
        bookingPlannerName = plannerUser.getName();
        bookingPlannerMail = plannerUser.getMail();
        bookingPlannerTel = plannerUser.getTel();
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

    public String getBookingRemark() {
        return bookingRemark;
    }

    public String getBookingPlannerPreName() {
        return bookingPlannerPreName;
    }

    public String getBookingPlannerName() {
        return bookingPlannerName;
    }

    public String getBookingPlannerMail() {
        return bookingPlannerMail;
    }

    public String getBookingPlannerTel() {
        return bookingPlannerTel;
    }

}
