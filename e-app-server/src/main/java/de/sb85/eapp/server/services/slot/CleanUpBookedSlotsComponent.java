package de.sb85.eapp.server.services.slot;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.services.ComponentBasics;
import de.sb85.eapp.server.services.slot.data.Slot;
import de.sb85.eapp.server.services.user.UserService;
import de.sb85.eapp.server.services.user.data.User;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.stream.StreamSupport;

@Component
@EnableScheduling
public class CleanUpBookedSlotsComponent extends ComponentBasics {

    private final SlotRepository slotRepository;
    private final UserService userService;

    public CleanUpBookedSlotsComponent(SlotRepository slotRepository, UserService userService) {
        this.slotRepository = slotRepository;
        this.userService = userService;
    }

    @Scheduled(fixedDelay = ApplicationConfig.CLEANUP_INTERVAL)
    public void cleanUpBookedSlots() {
        Iterable<User> users = userService.findAllBySystemUserFalseAndPlannerNotNull();
        long count = StreamSupport.stream(users.spliterator(), false).count();
        if (count > 0) {
            logger.info("CleanUpBookedSlots for " + count + " Planners...");
            users.forEach(user -> cleanUpBookedSlotsForUser(user));
        }
    }

    private void cleanUpBookedSlotsForUser(User user) {
        final long days = user.getPlanner().getSettings().getStorageDays();
        final Date date = new Date((new Date()).getTime() - ApplicationConfig.MS_PER_DAY * days);
        Iterable<Slot> slots = slotRepository.findByPlannerAndBookingNotNullAndStartBeforeOrderByStartAsc(user.getPlanner(), date);
        long count = StreamSupport.stream(slots.spliterator(), false).count();
        if (count > 0) {
            deleteBookedSlot(slots, count, user);
        }
    }

    private void deleteBookedSlot(Iterable<Slot> slots, long count, User user) {
        logger.info("CleanUpBookedSlots for " + user.getMail() + ": " + count);
        slots.forEach(slot -> slotRepository.delete(slot));
    }

}
