package de.sb85.eapp.server.api.v1.admin.account;

import de.sb85.eapp.server.api.v1.UserResponseRequestBasics;
import de.sb85.eapp.server.services.booking.BookingService;
import de.sb85.eapp.server.services.slot.SlotService;
import de.sb85.eapp.server.services.user.data.User;

import java.util.ArrayList;
import java.util.Date;
import java.util.stream.StreamSupport;

public class AccountResponse extends UserResponseRequestBasics {

    private final Boolean clientActive;
    private final Boolean plannerActive;
    private final Boolean active;
    private final Boolean bookingActive;
    private final String mailVerificationCode;
    private final String accountVerificationCode;
    private final Date lastContact;
    private long bookedAppointments = 0;
    private long freeSlots = 0;
    private long bookedSlots = 0;

    public static ArrayList<AccountResponse> transfer(Iterable<User> input, BookingService bookingService, SlotService slotService) {
        ArrayList<AccountResponse> ret = new ArrayList<>();
        input.forEach(user -> ret.add(new AccountResponse(user, bookingService, slotService)));
        return ret;
    }

    public AccountResponse(User user, BookingService bookingService, SlotService slotService) {
        super(user);
        clientActive = user.getClientActive();
        plannerActive = user.getPlannerActive();
        active = user.isActive();
        bookingActive = user.getBookingActive();
        mailVerificationCode = user.getMailVerificationCode();
        accountVerificationCode = user.getAccountVerificationCode();
        lastContact = user.getLastContact();
        if(user.getClient() != null) {
            bookedAppointments = StreamSupport.stream(bookingService.findAppointmentsByClient(user.getClient()).spliterator(), false).count();
        }
        if(user.getPlanner() != null){
            freeSlots = StreamSupport.stream(slotService.findFree(user.getPlanner()).spliterator(), false).count();
            bookedSlots = StreamSupport.stream(slotService.findBooked(user.getPlanner()).spliterator(), false).count();
        }
    }

    public Boolean getClientActive() {
        return clientActive;
    }

    public Boolean getPlannerActive() {
        return plannerActive;
    }

    public Boolean getActive() {
        return active;
    }

    public Boolean getBookingActive() {
        return bookingActive;
    }

    public String getMailVerificationCode() {
        return mailVerificationCode;
    }

    public String getAccountVerificationCode() {
        return accountVerificationCode;
    }

    public Date getLastContact() {
        return lastContact;
    }

    public long getBookedAppointments() {
        return bookedAppointments;
    }

    public long getFreeSlots() {
        return freeSlots;
    }

    public long getBookedSlots() {
        return bookedSlots;
    }

}
