package de.sb85.eapp.server.services.ical;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.services.ComponentBasics;
import de.sb85.eapp.server.services.ical.data.ICalDownload;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.stream.StreamSupport;

@Component
@EnableScheduling
public class CleanUpICalDownloadComponent extends ComponentBasics {

    private final ICalRepository iCalRepository;

    public CleanUpICalDownloadComponent(ICalRepository iCalRepository) {
        this.iCalRepository = iCalRepository;
    }

    @Scheduled(fixedDelay = ApplicationConfig.CLEANUP_INTERVAL)
    public void cleanUpICalDownload() {
        final Date date = new Date((new Date()).getTime() - ApplicationConfig.MS_PER_MIN);
        Iterable<ICalDownload> downloads = iCalRepository.findByCreationDateBefore(date);
        long count = StreamSupport.stream(downloads.spliterator(), false).count();
        if (count > 0) {
            deleteICalDownload(downloads, count);
        }
    }

    private void deleteICalDownload(Iterable<ICalDownload> downloads, long count) {
        logger.info("CleanUpICalDownload: " + count);
        downloads.forEach(slot -> iCalRepository.delete(slot));
    }

}
