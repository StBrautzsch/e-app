package de.sb85.eapp.server.services.user;

import de.sb85.eapp.server.services.user.data.Client;
import org.springframework.data.repository.CrudRepository;

public interface ClientRepository extends CrudRepository<Client, Integer> {

}
