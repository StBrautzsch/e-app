package de.sb85.eapp.server.services.booking;

import de.sb85.eapp.server.services.booking.data.AnonymClient;
import org.springframework.data.repository.CrudRepository;

public interface AnonymClientRepository extends CrudRepository<AnonymClient, Integer> {

}
