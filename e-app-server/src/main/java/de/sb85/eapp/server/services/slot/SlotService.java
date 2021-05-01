package de.sb85.eapp.server.services.slot;

import de.sb85.eapp.server.api.v1.planner.slot.SlotCreateRequest;
import de.sb85.eapp.server.services.ComponentBasics;
import de.sb85.eapp.server.services.booking.data.Booking;
import de.sb85.eapp.server.services.booking.exceptions.BookingNotValidException;
import de.sb85.eapp.server.services.ical.ICalComponent;
import de.sb85.eapp.server.services.mail.MailGeneratorComponent;
import de.sb85.eapp.server.services.slot.data.Slot;
import de.sb85.eapp.server.services.slot.exceptions.PeriodNotFreeException;
import de.sb85.eapp.server.services.slot.exceptions.SlotNotFoundException;
import de.sb85.eapp.server.services.user.data.Planner;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

@Service
public class SlotService extends ComponentBasics {

    private final SlotRepository slotRepository;
    private final MailGeneratorComponent mailGeneratorServiceComponent;
    private final ICalComponent iCalComponent;

    public SlotService(SlotRepository slotRepository, MailGeneratorComponent mailGeneratorServiceComponent,
                       ICalComponent iCalComponent) {
        super();
        this.slotRepository = slotRepository;
        this.mailGeneratorServiceComponent = mailGeneratorServiceComponent;
        this.iCalComponent = iCalComponent;
    }

    public Iterable<Slot> find(Planner planner, Optional<Long> start, Optional<Long> stop) {
        if (start.isPresent() && stop.isPresent()) {
            return slotRepository.findByPlannerAndStartBetweenOrderByStartAsc(planner, new Date(start.get()), new Date(stop.get()));
        }
        return slotRepository.findByPlannerOrderByStartAsc(planner);
    }

    public Iterable<Slot> find(Planner planner) {
        return slotRepository.findByPlannerOrderByStartAsc(planner);
    }

    public Iterable<Slot> findBooked(Planner planner) {
        return slotRepository.findByPlannerAndBookingNotNullOrderByStartAsc(planner);
    }

    public Iterable<Slot> findFree(Planner planner) {
        return slotRepository.findByPlannerAndBookingNullOrderByStartAsc(planner);
    }

    public Slot findByBooking(Booking booking) {
        return slotRepository.findByBooking(booking);
    }

    public Slot getById(Integer id) throws SlotNotFoundException {
        Optional<Slot> slot = slotRepository.findById(id);
        if (slot.isPresent()) {
            return slot.get();
        }
        throw new SlotNotFoundException();
    }

    public Slot moveSlot(Slot slot, Date start, Integer duration, Boolean notify) throws PeriodNotFreeException, BookingNotValidException {
        final Slot oldSlot = new Slot(slot.getPlanner(), slot.getStart(), slot.getDuration());
        if (!isRangeFree(slot.getPlanner(), start, duration, slot.getId())) {
            throw new PeriodNotFreeException();
        }
        slot.setStart(start);
        slot.setDuration(duration);
        slotRepository.save(slot);
        if (!slot.isFree() && notify) {
            mailGeneratorServiceComponent.appointmentMove(oldSlot, slot, iCalComponent.createICalClient(slot));
        }
        return slot;
    }

    public ArrayList<Slot> createSlot(Planner planner, ArrayList<SlotCreateRequest> slotRequest) throws PeriodNotFreeException {
        ArrayList<Slot> slots = new ArrayList<>();
        for (SlotCreateRequest slot : slotRequest) {
            slots.add(createSlot(planner, slot.getStart(), slot.getDuration()));
        }
        return slots;
    }

    public Slot createSlot(Planner planner, Date start, Integer duration) throws PeriodNotFreeException {
        if (!isRangeFree(planner, start, duration, -1)) {
            throw new PeriodNotFreeException();
        }
        Slot slot = new Slot(planner, start, duration);
        slotRepository.save(slot);
        return slot;
    }

    public void deleteSlot(Slot slot, Boolean notify) throws BookingNotValidException {
        slotRepository.delete(slot);
        if (!slot.isFree() && notify) {
            mailGeneratorServiceComponent.appointmentDelete(slot);
        }
    }

    public boolean isRangeFree(Planner planner, Date start, Integer duration, Integer id) {
        for (Slot slot : slotRepository.findByPlannerOrderByStartAsc(planner)) {
            if ((!id.equals(slot.getId())) && slot.isInRange(start, duration)) {
                return false;
            }
        }
        return true;
    }

}
