package de.sb85.eapp.server.services.mail;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.services.ComponentBasics;
import de.sb85.eapp.server.services.mail.data.MailQueue;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.stream.StreamSupport;

@Component
@EnableScheduling
public class CleanUpMailQueueComponent extends ComponentBasics {

    private final MailQueueRepository mailQueueRepository;

    public CleanUpMailQueueComponent(MailQueueRepository mailQueueRepository) {
        this.mailQueueRepository = mailQueueRepository;
    }

    @Scheduled(fixedDelay = ApplicationConfig.CLEANUP_INTERVAL)
    public void cleanUpICalDownload() {
        final Date date = new Date((new Date()).getTime() - ApplicationConfig.MS_PER_WEEK);
        Iterable<MailQueue> mails = mailQueueRepository.findByCreationDateBefore(date);
        long count = StreamSupport.stream(mails.spliterator(), false).count();
        if (count > 0) {
            deleteICalDownload(mails, count);
        }
    }

    private void deleteICalDownload(Iterable<MailQueue> mails, long count) {
        logger.info("CleanUpMailQueue: " + count);
        mails.forEach(mail -> mailQueueRepository.delete(mail));
    }

}
