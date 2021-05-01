package de.sb85.eapp.server.services.user;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.services.ComponentBasics;
import de.sb85.eapp.server.services.user.data.Client;
import de.sb85.eapp.server.services.user.data.Planner;
import de.sb85.eapp.server.services.user.data.User;
import de.sb85.eapp.server.services.user.exeptions.UserNotFoundException;
import de.sb85.eapp.server.services.user.exeptions.UserNotPlannerException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Iterator;
import java.util.Optional;

public abstract class UserServiceBasics extends ComponentBasics implements UserDetailsService {

    public final static String ERR_SYS_USER_NOT_FOUNT = "System-Administrator not found!";

    private final static String WARN_DB_EMPTY = "Database ist empty! Creating system user!";
    private final static String MSG_UPDATE_SYS_USER = "Updating System-Administrator..";

    private final static String SYS_USER_NAME = "Administrator";
    private final static String SYS_USER_PRE_NAME = "System";

    protected final ApplicationConfig applicationConfig;
    protected final UserRepository userRepository;
    protected final PasswordEncoder passwordEncoder;

    public UserServiceBasics(ApplicationConfig applicationConfig, UserRepository userRepository,
                             PasswordEncoder passwordEncoder) throws UserNotFoundException {
        super();
        this.applicationConfig = applicationConfig;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        if (isUserTableEmpty()) {
            createInitialUsers();
        }
        checkSystemUser();
    }

    private User getSysAdminUser() throws UserNotFoundException {
        Iterator<User> i = userRepository.findAllBySystemUserTrue().iterator();
        if (i.hasNext()) {
            User user = i.next();
            if (i.hasNext()) throw new UserNotFoundException(ERR_SYS_USER_NOT_FOUNT);
            return user;
        }
        throw new UserNotFoundException(ERR_SYS_USER_NOT_FOUNT);
    }

    private void checkSystemUser() throws UserNotFoundException {
        User user = getSysAdminUser();
        if (!user.getMail().equals(applicationConfig.getAdminMail()) ||
                !passwordEncoder.matches(applicationConfig.getAdminPw(), user.getPassword())) {
            logger.warn(MSG_UPDATE_SYS_USER);
            user.setMail(applicationConfig.getAdminMail());
            user.setPwHash(passwordEncoder.encode(applicationConfig.getAdminPw()));
            userRepository.save(user);
        }
    }

    private boolean isUserTableEmpty() {
        return userRepository.count() == 0;
    }

    private void createInitialUsers() {
        logger.warn(WARN_DB_EMPTY);
        createInitialAdminUser();
    }

    private void createInitialAdminUser() {
        User adminUser = new User(applicationConfig.getAdminMail(), applicationConfig.getAdminPw(),
                SYS_USER_PRE_NAME, SYS_USER_NAME, "", true, false);
        adminUser.setAdmin(true);
        adminUser.setPlannerActive(true);
        adminUser.setBookingActive(false);
        userRepository.save(adminUser);
    }

    public Planner getPlanner(User user) throws UserNotPlannerException {
        Planner planner = user.getPlanner();
        if (planner != null) {
            return planner;
        }
        throw new UserNotPlannerException();
    }

    public Client getClient(User user) throws UserNotFoundException {
        Client client = user.getClient();
        if (client != null) {
            return client;
        }
        throw new UserNotFoundException();
    }

    public User getUserById(Integer id) throws UserNotFoundException {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return user.get();
        }
        throw new UserNotFoundException();
    }

    public User getUserMoodleById(String moodleId) throws UserNotFoundException {
        Optional<User> user = userRepository.findByMoodleUserId(moodleId);
        if (user.isPresent()) {
            return user.get();
        }
        throw new UserNotFoundException();
    }

    public User getUserMoodleFeedsId(String ref) throws UserNotFoundException {
        Optional<User> user = userRepository.findByFeedsRef(ref);
        if (user.isPresent()) {
            return user.get();
        }
        throw new UserNotFoundException();
    }

    public User getUserByUsername(String username) throws UserNotFoundException {
        try {
            return loadUserByUsername(username);
        } catch (UsernameNotFoundException e) {
            throw new UserNotFoundException();
        }
    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByMail(username);
        if (user.isPresent()) {
            return user.get();
        }
        throw new UsernameNotFoundException(username);
    }

    public User findUserByPlanner(Planner planner) {
        return userRepository.findByPlanner(planner);
    }

    public User findUserByClient(Client client) {
        return userRepository.findByClient(client);
    }

    public Iterable<User> findAllBySystemUserFalseOrderByNameAscPreNameAsc() {
        return userRepository.findAllBySystemUserFalseOrderByNameAscPreNameAsc();
    }

    public Iterable<User> findAllBySystemUserFalseAndPlannerNotNull() {
        return userRepository.findAllBySystemUserFalseAndPlannerNotNull();
    }

    public void contact(User user) {
        user.setLastContact();
        userRepository.save(user);
    }

    public void setMoodleId(User user, String moodleId) {
        user.setMoodleUserId(moodleId);
        userRepository.save(user);
    }

}
