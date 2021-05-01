package de.sb85.eapp.server.services.user;

import de.sb85.eapp.server.services.ComponentBasics;
import de.sb85.eapp.server.services.booking.exceptions.BookingNotValidException;
import de.sb85.eapp.server.services.slot.data.Slot;
import org.springframework.stereotype.Component;

@Component
public class UserToolsComponent extends ComponentBasics {

    private final UserRepository userRepository;

    public UserToolsComponent(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String getPlannerName(Slot slot) {
        return userRepository.findByPlanner(slot.getPlanner()).mergeName();
    }

    public String getPlannerMail(Slot slot) {
        return userRepository.findByPlanner(slot.getPlanner()).getMail();
    }

    public String getClientName(Slot slot) throws BookingNotValidException {
        if (slot.getBooking().isClientAnonym()) {
            return slot.getBooking().getAnonymClient().getName();
        }
        if (slot.getBooking().isClientAuth()) {
            return userRepository.findByClient(slot.getBooking().getAuthClient()).mergeName();
        }
        throw new BookingNotValidException();
    }

    public String getClientMail(Slot slot) throws BookingNotValidException {
        if (slot.getBooking().isClientAnonym()) {
            return slot.getBooking().getAnonymClient().getMail();
        }
        if (slot.getBooking().isClientAuth()) {
            return userRepository.findByClient(slot.getBooking().getAuthClient()).getMail();
        }
        throw new BookingNotValidException();
    }

}
