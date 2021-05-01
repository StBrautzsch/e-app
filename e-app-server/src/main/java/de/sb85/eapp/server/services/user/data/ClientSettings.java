package de.sb85.eapp.server.services.user.data;

import de.sb85.eapp.server.services.DataBasics;

import javax.persistence.Entity;

@Entity
public class ClientSettings extends DataBasics {

    public static final boolean MAIL_REMINDER_DEFAULT = true;
    public static final boolean BOOKING_MAIL_DEFAULT = true;

    private Boolean reminderMail;
    private Boolean bookingMail;

    public ClientSettings() {
        super();
        setDefaults();
    }

    public void setDefaults() {
        setModifyDate();
        reminderMail = MAIL_REMINDER_DEFAULT;
        bookingMail = BOOKING_MAIL_DEFAULT;
    }

    public void update(ClientSettings settings) {
        setReminderMail(settings.getReminderMail());
        setBookingMail(settings.getBookingMail());
    }

    public Boolean getReminderMail() {
        return reminderMail;
    }

    public void setReminderMail(Boolean reminderMail) {
        setModifyDate();
        this.reminderMail = reminderMail;
    }

    public Boolean getBookingMail() {
        return bookingMail;
    }

    public void setBookingMail(Boolean bookingMail) {
        setModifyDate();
        this.bookingMail = bookingMail;
    }

}
