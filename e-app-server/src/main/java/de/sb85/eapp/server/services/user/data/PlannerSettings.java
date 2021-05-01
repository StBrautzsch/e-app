package de.sb85.eapp.server.services.user.data;

import de.sb85.eapp.server.services.DataBasics;

import javax.persistence.Entity;

@Entity
public class PlannerSettings  extends DataBasics {

    public static final String ERR_VALUE_NOT_VALID = "Value not valid!";

    public static final int WEEKDAY_MODE_DEFAULT = 0;
    public static final int WEEKDAY_MODE_MIN = 0;
    public static final int WEEKDAY_MODE_MAX = 2;

    public static final int HOUR_FROM_DEFAULT = 8;
    public static final int HOUR_TO_DEFAULT = 20;
    public static final int HOUR_MIN = 0;
    public static final int HOUR_MAX = 24;

    public static final int WEEKS_PAST_DEFAULT = 53;
    public static final int WEEKS_PAST_MIN = 0;
    public static final int WEEKS_FUTURE_DEFAULT = 2 * 53;
    public static final int WEEKS_FUTURE_MIN = 3;

    public static final int STORAGE_DAYS_DEFAULT = 365;
    public static final int STORAGE_DAYS_MIN = 0;

    public static final boolean MAIL_REMINDER_DEFAULT = true;

    public static final boolean BOOKING_MAIL_DEFAULT = true;

    public static final boolean STORNO_MAIL_DEFAULT = true;

    private Integer weekdayMode;
    private Integer hourFrom;
    private Integer hourTo;
    private Integer weeksPast;
    private Integer weeksFuture;
    private Integer storageDays;
    private Boolean reminderMail;
    private Boolean bookingMail;
    private Boolean stornoMail;

    public PlannerSettings() {
        super();
        setDefaults();
    }

    public void setDefaults() {
        setModifyDate();
        weekdayMode = WEEKDAY_MODE_DEFAULT;
        hourFrom = HOUR_FROM_DEFAULT;
        hourTo = HOUR_TO_DEFAULT;
        weeksPast = WEEKS_PAST_DEFAULT;
        weeksFuture = WEEKS_FUTURE_DEFAULT;
        storageDays = STORAGE_DAYS_DEFAULT;
        reminderMail = MAIL_REMINDER_DEFAULT;
        bookingMail = BOOKING_MAIL_DEFAULT;
        stornoMail = STORNO_MAIL_DEFAULT;
    }

    public void update(PlannerSettings settings) throws Exception {
        setWeekdayMode(settings.getWeekdayMode());
        setHourFrom(settings.getHourFrom());
        setHourTo(settings.getHourTo());
        setWeeksPast(settings.getWeeksPast());
        setWeeksFuture(settings.getWeeksFuture());
        setStorageDays(settings.getStorageDays());
        setReminderMail(settings.getReminderMail());
        setBookingMail(settings.getBookingMail());
        setStornoMail(settings.getStornoMail());
    }

    private static boolean isBetween(int numberToCheck, int lowerBound, int upperBound) {
        return numberToCheck >= lowerBound && numberToCheck <= upperBound;
    }

    public Integer getWeekdayMode() {
        return weekdayMode;
    }

    public void setWeekdayMode(Integer weekdayMode) throws Exception {
        if(!isBetween(weekdayMode, WEEKDAY_MODE_MIN, WEEKDAY_MODE_MAX)) {
            throw new Exception(ERR_VALUE_NOT_VALID);
        }
        setModifyDate();
        this.weekdayMode = weekdayMode;
    }

    public Integer getHourFrom() {
        return hourFrom;
    }

    public void setHourFrom(Integer hourFrom) throws Exception {
        if(!isBetween(hourFrom, HOUR_MIN, HOUR_MAX)) {
            throw new Exception(ERR_VALUE_NOT_VALID);
        }
        setModifyDate();
        this.hourFrom = hourFrom;
    }

    public Integer getHourTo() {
        return hourTo;
    }

    public void setHourTo(Integer hourTo) throws Exception {
        if(!isBetween(hourTo, HOUR_MIN, HOUR_MAX)) {
            throw new Exception(ERR_VALUE_NOT_VALID);
        }
        setModifyDate();
        this.hourTo = hourTo;
    }

    public Integer getWeeksPast() {
        return weeksPast;
    }

    public void setWeeksPast(Integer weeksPast) throws Exception {
        if(weeksPast < WEEKS_PAST_MIN) {
            throw new Exception(ERR_VALUE_NOT_VALID);
        }
        setModifyDate();
        this.weeksPast = weeksPast;
    }

    public Integer getWeeksFuture() {
        return weeksFuture;
    }

    public void setWeeksFuture(Integer weeksFuture) throws Exception {
        if(weeksFuture < WEEKS_FUTURE_MIN) {
            throw new Exception(ERR_VALUE_NOT_VALID);
        }
        setModifyDate();
        this.weeksFuture = weeksFuture;
    }

    public Integer getStorageDays() {
        return storageDays;
    }

    public void setStorageDays(Integer storageDays) throws Exception {
        if(storageDays < STORAGE_DAYS_MIN) {
            throw new Exception(ERR_VALUE_NOT_VALID);
        }
        setModifyDate();
        this.storageDays = storageDays;
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

    public Boolean getStornoMail() {
        return stornoMail;
    }

    public void setStornoMail(Boolean stornoMail) {
        setModifyDate();
        this.stornoMail = stornoMail;
    }

}
