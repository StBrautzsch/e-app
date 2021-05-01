package de.sb85.eapp.server.services.mail;

import de.sb85.eapp.server.services.mail.data.MailQueue;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;

public interface MailQueueRepository extends CrudRepository<MailQueue, Integer> {

    Iterable<MailQueue> findAllBySendFalseAndErrorFalse();

    Iterable<MailQueue> findByCreationDateBefore(Date creationDate);

}
