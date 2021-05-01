package de.sb85.eapp.server.services.ical;

import de.sb85.eapp.server.services.ical.data.ICalDownload;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;

public interface ICalRepository extends CrudRepository<ICalDownload, Integer> {

    ICalDownload findByReference(String reference);

    Iterable<ICalDownload> findByCreationDateBefore(Date creationDate);

}
