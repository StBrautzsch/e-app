package de.sb85.eapp.server.services.slot;

import de.sb85.eapp.server.services.ComponentBasics;
import de.sb85.eapp.server.services.mail.MailGeneratorComponent;
import de.sb85.eapp.server.services.slot.data.Slot;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.stream.StreamSupport;

@Component
@EnableScheduling
public class SlotReminderComponent extends ComponentBasics {

    @Value("${reminder.before.minutes}")
    private long reminderBeforeMinutes;

    private final SlotRepository slotRepository;
    private final MailGeneratorComponent mailGeneratorComponent;

    public SlotReminderComponent(SlotRepository slotRepository, MailGeneratorComponent mailGeneratorComponent) {
        this.slotRepository = slotRepository;
        this.mailGeneratorComponent = mailGeneratorComponent;
    }

    @Scheduled(fixedDelay = 1000 * 60)
    public void slotReminder() {
        final Date now = new Date();
        final Date stop = new Date(now.getTime() + reminderBeforeMinutes * 60 * 1000);
        Iterable<Slot> slots = slotRepository.findByReminderPostetFalseAndBookingNotNullAndStartBetweenOrderByStartAsc(now, stop);
        long count = StreamSupport.stream(slots.spliterator(), false).count();
        if (count > 0) {
            reminder(slots, count);
        }
    }

    private void reminder(Iterable<Slot> slots, long count) {
        logger.info("SlotReminder: " + count);
        slots.forEach(slot -> {
            reminderClient(slot);
            reminderPlanner(slot);
            slot.setReminderPostet();
            slotRepository.save(slot);
        });
    }

    private void reminderClient(Slot slot) {
        if (slot.getBooking().isClientAnonym() ||
                (slot.getBooking().isClientAuth() && slot.getBooking().getAuthClient().getSettings().getReminderMail())) {
            try {
                mailGeneratorComponent.mailReminderClient(slot);
            } catch (Exception e) {
                logger.error(e.getMessage());
            }
        }
    }

    private void reminderPlanner(Slot slot) {
        if (slot.getPlanner().getSettings().getReminderMail()) {
            try {
                mailGeneratorComponent.mailReminderPlanner(slot);
            } catch (Exception e) {
                logger.error(e.getMessage());
            }
        }
    }

}
