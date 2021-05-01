package de.sb85.eapp.server.services.slot;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.services.ComponentBasics;
import de.sb85.eapp.server.services.slot.data.Slot;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.stream.StreamSupport;

@Component
@EnableScheduling
public class CleanUpPastFreeSlotsComponent extends ComponentBasics {

    private final SlotRepository slotRepository;

    public CleanUpPastFreeSlotsComponent(SlotRepository slotRepository) {
        this.slotRepository = slotRepository;
    }

    @Scheduled(fixedDelay = ApplicationConfig.CLEANUP_INTERVAL)
    public void cleanUpPastFreeSlots() {
        Iterable<Slot> slots = slotRepository.findByBookingNullAndStartIsLessThan(new Date());
        long count = StreamSupport.stream(slots.spliterator(), false).count();
        if (count > 0) {
            deleteFreePastSlots(slots, count);
        }
    }

    private void deleteFreePastSlots(Iterable<Slot> slots, long count) {
        logger.info("CleanUpPastFreeSlots: " + count);
        slots.forEach(slot -> slotRepository.delete(slot));
    }

}
