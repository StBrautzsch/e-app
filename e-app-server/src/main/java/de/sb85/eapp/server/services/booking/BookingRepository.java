package de.sb85.eapp.server.services.booking;

import de.sb85.eapp.server.services.booking.data.Booking;
import de.sb85.eapp.server.services.user.data.Client;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface BookingRepository extends CrudRepository<Booking, Integer> {

    Iterable<Booking> findByAuthClient(Client authClient);

    Optional<Booking> findByReference(String reference);

}
