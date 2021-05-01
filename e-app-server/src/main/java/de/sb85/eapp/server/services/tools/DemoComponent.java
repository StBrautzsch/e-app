package de.sb85.eapp.server.services.tools;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.services.ComponentBasics;
import de.sb85.eapp.server.services.booking.AnonymClientRepository;
import de.sb85.eapp.server.services.booking.BookingRepository;
import de.sb85.eapp.server.services.slot.SlotRepository;
import de.sb85.eapp.server.services.slot.data.Slot;
import de.sb85.eapp.server.services.user.UserRepository;
import de.sb85.eapp.server.services.user.UserService;
import de.sb85.eapp.server.services.user.data.Planner;
import de.sb85.eapp.server.services.user.data.User;
import de.sb85.eapp.server.services.user.exeptions.MailNotUniqueException;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Date;

@Component
@Profile("demo")
public class DemoComponent extends ComponentBasics {

    private final static String WARN_DEMO = "Demo mode ist active!";
    private final static String WARN_DB_EMPTY_USER = "Database is empty! Creating demo users!";

    private final static String DEMO_PW = "pass";
    private final static String DEMO_DOMAIN = "@example.com";

    public final SlotRepository slotRepository;
    public final AnonymClientRepository anonymClientRepository;
    public final BookingRepository bookingRepository;
    private final UserService userService;
    private final UserRepository userRepository;
    private final ApplicationConfig applicationConfig;

    public DemoComponent(SlotRepository slotRepository, AnonymClientRepository anonymClientRepository,
                         BookingRepository bookingRepository, UserService userService, UserRepository userRepository, ApplicationConfig applicationConfig) throws MailNotUniqueException {
        super();
        this.slotRepository = slotRepository;
        this.anonymClientRepository = anonymClientRepository;
        this.bookingRepository = bookingRepository;
        this.userService = userService;
        this.userRepository = userRepository;
        this.applicationConfig = applicationConfig;
        logger.warn(WARN_DB_EMPTY_USER);
        checkDemoUsers();
    }

    private void checkDemoUsers() throws MailNotUniqueException {
        if (isUserTableEmpty()) {
            logger.warn(WARN_DEMO);
            createDemoUsers();
            logger.warn("URL E-APP-Planner: " + applicationConfig.getUrlPlanner());
            logger.warn("URL E-APP-Client: " + applicationConfig.getUrlClient());
        }
    }

    private boolean isUserTableEmpty() {
        return userRepository.count() == 1;
    }

    private void createDemoUsers() throws MailNotUniqueException {
        createDemoSlots(createUser("Max", "Mustermann", "0123 123456", true, true, true));
        createDemoSlots(createUser("Maxi", "Musterfrau", "", true, true, false));
        createUser("Max", "Student", "", true, false, false);
        createUser("Maxi", "Studentin", "0987 654321", true, false, false);
    }

    private User createUser(String preName, String name, String tel, boolean client, boolean planner, boolean admin) throws MailNotUniqueException {
        return userService.createUser(
                (preName.toLowerCase() + "." + name.toLowerCase() + DEMO_DOMAIN).replace(" ", "_"),
                DEMO_PW, preName, name, tel, client, planner, admin);
    }

    private void createDemoSlots(User user) {
        final LocalDateTime now = LocalDateTime.now();
        Date start = java.sql.Timestamp.valueOf(LocalDateTime.of(now.getYear(), now.getMonthValue(), now.getDayOfMonth(), 0, 0));
        for (int i = 0; i < 75; i++) {
            if (i % 2 == 0) {
                safeSlot(user.getPlanner(), new Date(start.getTime() + 1000 * 60 * 60 * 8), 30);
                safeSlot(user.getPlanner(), new Date(start.getTime() + 1000 * 60 * 60 * 9), 30);
                safeSlot(user.getPlanner(), new Date(start.getTime() + 1000 * 60 * 60 * 10), 30);
                safeSlot(user.getPlanner(), new Date(start.getTime() + 1000 * 60 * 60 * 11), 60);
            } else {
                safeSlot(user.getPlanner(), new Date(start.getTime() + 1000 * 60 * 60 * 13), 45);
                safeSlot(user.getPlanner(), new Date(start.getTime() + 1000 * 60 * 60 * 14), 45);
                safeSlot(user.getPlanner(), new Date(start.getTime() + 1000 * 60 * 60 * 15), 60);
                safeSlot(user.getPlanner(), new Date(start.getTime() + 1000 * 60 * 60 * 16), 60);
                safeSlot(user.getPlanner(), new Date(start.getTime() + 1000 * 60 * 60 * 17), 60);
                safeSlot(user.getPlanner(), new Date(start.getTime() + 1000 * 60 * 60 * 18), 120);
                safeSlot(user.getPlanner(), new Date(start.getTime() + 1000 * 60 * 60 * 20), 60);
            }
            start = new Date(start.getTime() + 1000 * 60 * 60 * 24);
        }
    }

    private Slot safeSlot(Planner planner, Date date, Integer duration) {
        Slot s = new Slot(planner, date, duration);
        slotRepository.save(s);
        return s;
    }

}
