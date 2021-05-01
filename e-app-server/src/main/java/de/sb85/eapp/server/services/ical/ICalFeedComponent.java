package de.sb85.eapp.server.services.ical;

import de.sb85.eapp.server.services.ComponentBasics;
import de.sb85.eapp.server.services.booking.BookingService;
import de.sb85.eapp.server.services.slot.SlotService;
import de.sb85.eapp.server.services.slot.data.Slot;
import de.sb85.eapp.server.services.user.UserService;
import de.sb85.eapp.server.services.user.data.User;
import de.sb85.eapp.server.services.user.exeptions.UserNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ICalFeedComponent extends ComponentBasics {

    private final UserService userService;
    private final SlotService slotService;
    private final BookingService bookingService;
    private final ICalComponent iCalComponent;

    public ICalFeedComponent(UserService userService, SlotService slotService, BookingService bookingService, ICalComponent iCalComponent) {
        this.userService = userService;
        this.slotService = slotService;
        this.bookingService = bookingService;
        this.iCalComponent = iCalComponent;
    }

    public String generateFeeds(String reference) throws UserNotFoundException {
        User user = userService.getUserMoodleFeedsId(reference);
        return iCalComponent.createICalFeed(getBookedPlannerSlots(user), getClientAppointments(user));
    }

    private Optional<Iterable<Slot>> getBookedPlannerSlots(User user) {
        if (user.getPlanner() != null) {
            return Optional.of(slotService.findBooked(user.getPlanner()));
        }
        return Optional.empty();
    }

    private Optional<Iterable<Slot>> getClientAppointments(User user) {
        if (user.getClient() != null) {
            return Optional.of(bookingService.findAppointmentsByClient(user.getClient()));
        }
        return Optional.empty();
    }

}
