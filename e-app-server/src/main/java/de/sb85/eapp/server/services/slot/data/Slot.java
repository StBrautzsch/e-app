package de.sb85.eapp.server.services.slot.data;

import de.sb85.eapp.server.services.DataBasics;
import de.sb85.eapp.server.services.booking.data.Booking;
import de.sb85.eapp.server.services.user.data.Planner;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.util.Date;

@Entity
public class Slot extends DataBasics {

    public final static int DURATION_TO_MS = 60 * 1000;

    @OneToOne(targetEntity = Planner.class)
    private Planner planner;

    private Date start;
    private Integer duration;

    @OneToOne(targetEntity = Booking.class, cascade = CascadeType.ALL)
    @JoinColumn(unique = true)
    private Booking booking;

    private Boolean reminderPostet = false;

    public Slot(Planner planner, Date start, Integer duration) {
        super();
        this.planner = planner;
        this.start = start;
        this.duration = duration;
    }

    public Slot() {
        super();
    }

    public boolean isFree() {
        return booking == null;
    }

    public boolean isInRange(Date start, Integer duration) {
        final long start1 = getStart().getTime();
        final long end1 = getEnd().getTime();
        final long start2 = start.getTime();
        final long end2 = (new Date(start.getTime() + duration * DURATION_TO_MS)).getTime();

        if ((start1 <= start2) && (end1 >= end2)) {
            return true;
        }
        if ((start2 <= start1) && (end2 > start1)) {
            return true;
        }
        if ((start2 < end1) && (end2 >= end1)) {
            return true;
        }
        return false;
    }

    public Date getEnd() {
        return new Date(start.getTime() + duration * DURATION_TO_MS);
    }

    public void setStart(Date start) {
        setModifyDate();
        this.start = start;
    }

    public void setDuration(Integer duration) {
        setModifyDate();
        this.duration = duration;
    }

    public boolean setBooking(Booking booking) {
        if (!isFree()) {
            return false;
        }
        setModifyDate();
        this.booking = booking;
        return true;
    }

    public boolean clearBooking() {
        if(isFree()) {
            return false;
        }
        setModifyDate();
        this.booking = null;
        return true;
    }

    public Planner getPlanner() {
        return planner;
    }

    public Date getStart() {
        return start;
    }

    public Integer getDuration() {
        return duration;
    }

    public Booking getBooking() {
        return booking;
    }

    public Boolean getReminderPostet() {
        return reminderPostet;
    }

    public void setReminderPostet() {
        this.reminderPostet = true;
    }

    public String toString() {
        String booking = "BOOKED";
        if(isFree()) {
            booking = "FREE";
        }
        return getId() + "/" + booking + "/" + getDuration() + "/" + getStart().toString();
    }

}
