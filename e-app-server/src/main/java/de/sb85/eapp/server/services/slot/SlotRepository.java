package de.sb85.eapp.server.services.slot;

import de.sb85.eapp.server.services.booking.data.Booking;
import de.sb85.eapp.server.services.slot.data.Slot;
import de.sb85.eapp.server.services.user.data.Planner;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;

public interface SlotRepository extends CrudRepository<Slot, Integer> {

    Iterable<Slot> findByPlannerOrderByStartAsc(Planner planner);

    Iterable<Slot> findByPlannerAndBookingNotNullOrderByStartAsc(Planner planner);

    Iterable<Slot> findByPlannerAndBookingNullOrderByStartAsc(Planner planner);

    Iterable<Slot> findByPlannerAndStartBetweenOrderByStartAsc(Planner planner, Date start, Date stop);

    Iterable<Slot> findByPlannerAndBookingNotNullAndStartBeforeOrderByStartAsc(Planner planner, Date start);

    Iterable<Slot> findByReminderPostetFalseAndBookingNotNullAndStartBetweenOrderByStartAsc(Date start, Date stop);

    Iterable<Slot> findByPlannerAndBookingNullAndStartIsGreaterThanOrderByStartAsc(Planner planner, Date start);

    Iterable<Slot> findByBookingInOrderByStartAsc(Iterable<Booking> bookings);

    Slot findByBooking(Booking booking);

    Iterable<Slot> findByBookingNullAndStartIsLessThan(Date start);

}
