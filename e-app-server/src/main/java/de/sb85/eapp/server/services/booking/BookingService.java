package de.sb85.eapp.server.services.booking;

import de.sb85.eapp.server.api.v1.BookingRequest;
import de.sb85.eapp.server.api.v1.booking.BookingAnonymRequest;
import de.sb85.eapp.server.services.ComponentBasics;
import de.sb85.eapp.server.services.ReferenceNotFoundException;
import de.sb85.eapp.server.services.booking.data.AnonymClient;
import de.sb85.eapp.server.services.booking.data.Booking;
import de.sb85.eapp.server.services.booking.exceptions.BookingNotValidException;
import de.sb85.eapp.server.services.booking.exceptions.SlotNotBookableException;
import de.sb85.eapp.server.services.ical.ICalComponent;
import de.sb85.eapp.server.services.mail.MailGeneratorComponent;
import de.sb85.eapp.server.services.slot.SlotRepository;
import de.sb85.eapp.server.services.slot.SlotService;
import de.sb85.eapp.server.services.slot.data.Slot;
import de.sb85.eapp.server.services.slot.exceptions.SlotNotFoundException;
import de.sb85.eapp.server.services.user.UserService;
import de.sb85.eapp.server.services.user.UserToolsComponent;
import de.sb85.eapp.server.services.user.data.Client;
import de.sb85.eapp.server.services.user.data.User;
import de.sb85.eapp.server.services.user.exeptions.UserNotFoundException;
import de.sb85.eapp.server.services.user.exeptions.UserNotPlannerException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class BookingService extends ComponentBasics {

    private final SlotRepository slotRepository;
    private final BookingRepository bookingRepository;
    private final UserService userService;
    private final SlotService slotService;
    private final MailGeneratorComponent mailGeneratorServiceComponent;
    private final ICalComponent iCalComponent;
    private final UserToolsComponent userToolsComponent;

    public BookingService(SlotRepository slotRepository, BookingRepository bookingRepository, UserService userService,
                          SlotService slotService, MailGeneratorComponent mailGeneratorServiceComponent,
                          ICalComponent iCalComponent, UserToolsComponent userToolsComponent) {
        super();
        this.slotRepository = slotRepository;
        this.bookingRepository = bookingRepository;
        this.userService = userService;
        this.slotService = slotService;
        this.mailGeneratorServiceComponent = mailGeneratorServiceComponent;
        this.iCalComponent = iCalComponent;
        this.userToolsComponent = userToolsComponent;
    }

    public Slot findSlotForBookingByReference(String reference) throws ReferenceNotFoundException {
        Optional<Booking> booking = bookingRepository.findByReference(reference);
        if (booking.isPresent() && booking.get().isClientAnonym()) {
            return slotRepository.findByBooking(booking.get());
        }
        throw new ReferenceNotFoundException();
    }

    public Iterable<User> findPlanners() {
        return userService.findPlannersForBooking();
    }

    public Iterable<Slot> findSlots(Integer userId) throws UserNotFoundException, UserNotPlannerException {
        Date start = new Date();
        return slotRepository.findByPlannerAndBookingNullAndStartIsGreaterThanOrderByStartAsc(
                userService.getPlanner(userService.getUserById(userId)), start);
    }

    public Iterable<Slot> findAppointmentsByClient(Client authClient) {
        return slotRepository.findByBookingInOrderByStartAsc(bookingRepository.findByAuthClient(authClient));
    }

    public Slot bookingAuth(BookingRequest request, Client client) throws SlotNotBookableException {
        try {
            Slot slot = checkSlotForBooking(request);
            if (slot.setBooking(new Booking(client, request.getRemark()))) {
                booking(slot);
                return slot;
            }
        } catch (Exception ignored) {
        }
        throw new SlotNotBookableException();
    }

    public Slot bookingAnonym(BookingAnonymRequest request) throws SlotNotBookableException {
        try {
            Slot slot = checkSlotForBooking(request);
            if (slot.setBooking(new Booking(new AnonymClient(request.getMail(), request.getName(), request.getTel()), request.getRemark()))) {
                booking(slot);
                return slot;
            }
        } catch (Exception ignored) {
        }
        throw new SlotNotBookableException();
    }

    private void booking(Slot slot) throws BookingNotValidException {
        slotRepository.save(slot);
        sendBookingMail(slot);
    }

    private void sendBookingMail(Slot slot) throws BookingNotValidException {
        if (slot.getBooking().isClientAnonym() ||
                (slot.getBooking().isClientAuth() && slot.getBooking().getAuthClient().getSettings().getBookingMail())) {
            mailGeneratorServiceComponent.bookingConfirmation(slot, iCalComponent.createICalClient(slot));
        }
        if (slot.getPlanner().getSettings().getBookingMail()) {
            mailGeneratorServiceComponent.bookingInformation(slot, iCalComponent.createICalPlanner(slot));
        }
    }

    private Slot checkSlotForBooking(BookingRequest request)
            throws BookingNotValidException, SlotNotFoundException, UserNotFoundException, SlotNotBookableException {
        Slot slot = slotService.getById(request.getSlotId());
        if(!slot.isFree()) {
            throw new SlotNotBookableException();
        }
        userService.getUserById(request.getUserId());
        if ((slot.getStart().getTime() == request.getStart().getTime()) &&
                slot.getDuration().equals(request.getDuration()) &&
                slot.isFree()) {
            return slot;
        }
        throw new BookingNotValidException();
    }

    public void storno(Integer id, Client client) throws BookingNotValidException, SlotNotFoundException {
        Slot slot = slotService.getById(id);
        if (slot.isFree() || !slot.getBooking().getAuthClient().equals(client)) {
            throw new BookingNotValidException();
        }
        clearBookingAndSave(slot, slot.getBooking());
    }

    public void storno(String reference) throws ReferenceNotFoundException, BookingNotValidException {
        Optional<Booking> booking = bookingRepository.findByReference(reference);
        if (booking.isEmpty() || !booking.get().isClientAnonym()) {
            throw new ReferenceNotFoundException();
        }
        clearBookingAndSave(slotRepository.findByBooking(booking.get()), booking.get());
    }

    private void clearBookingAndSave(Slot slot, Booking booking) throws BookingNotValidException {
        final String clientName = userToolsComponent.getClientName(slot);
        if (slot.clearBooking()) {
            slotRepository.save(slot);
            bookingRepository.delete(booking);
            if (slot.getPlanner().getSettings().getBookingMail()) {
                mailGeneratorServiceComponent.stornoInformation(slot, clientName);
            }
        } else {
            throw new BookingNotValidException();
        }
    }

}
