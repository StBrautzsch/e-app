package de.sb85.eapp.server.services.user;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.api.v1.AccountRequest;
import de.sb85.eapp.server.api.v1.admin.account.AccountTransactionRequest;
import de.sb85.eapp.server.api.v1.user.UserDataRequest;
import de.sb85.eapp.server.services.mail.MailGeneratorComponent;
import de.sb85.eapp.server.services.tools.PasswordGeneratorComponent;
import de.sb85.eapp.server.services.user.data.ClientSettings;
import de.sb85.eapp.server.services.user.data.PlannerSettings;
import de.sb85.eapp.server.services.user.data.User;
import de.sb85.eapp.server.services.user.exeptions.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
public class UserService extends UserServiceBasics {

    private final PlannerSettingsRepository plannerSettingsRepository;
    private final ClientSettingsRepository clientSettingsRepository;
    private final PlannerRepository plannerRepository;
    private final MailGeneratorComponent mailGeneratorComponent;
    private final PasswordGeneratorComponent passwordGeneratorComponent;

    public UserService(ApplicationConfig applicationConfig, UserRepository userRepository, PlannerSettingsRepository plannerSettingsRepository,
                       ClientSettingsRepository clientSettingsRepository, MailGeneratorComponent mailGeneratorComponent, PasswordEncoder passwordEncoder,
                       PlannerRepository plannerRepository, PasswordGeneratorComponent passwordGeneratorComponent)
            throws UserNotFoundException {
        super(applicationConfig, userRepository, passwordEncoder);
        this.plannerSettingsRepository = plannerSettingsRepository;
        this.clientSettingsRepository = clientSettingsRepository;
        this.mailGeneratorComponent = mailGeneratorComponent;
        this.plannerRepository = plannerRepository;
        this.passwordGeneratorComponent = passwordGeneratorComponent;
    }

    public Iterable<User> findPlannersForBooking() {
        return userRepository
                .findByPlannerInAndSystemUserFalseAndPlannerActiveTrueAndBookingActiveTrueAndActiveTrueOrderByNameAscPreNameAsc(
                        plannerRepository.findAll());
    }

    public User createClientUser(AccountRequest request) throws MailNotUniqueException {
        return createUser(request.getMail(), request.getPreName(), request.getName(), request.getTel(),
                true, false, false);
    }

    public User createUser(AccountRequest request) throws MailNotUniqueException {
        return createUser(request.getMail(), request.getPreName(), request.getName(), request.getTel(),
                request.getClientActive(), request.getPlannerActive(), request.getAdmin());
    }

    public User createUser(String mail, String password, String preName, String name, String tel,
                           boolean client, boolean planner, boolean admin) throws MailNotUniqueException {
        return createUser(mail, preName, name, tel, client, planner, admin, password, false);
    }

    public User createUser(String mail, String preName, String name, String tel,
                           boolean client, boolean planner, boolean admin) throws MailNotUniqueException {
        final String password = passwordGeneratorComponent.generatePassword();
        return createUser(mail, preName, name, tel, client, planner, admin, password, true);
    }

    private User createUser(String mail, String preName, String name, String tel,
                            boolean client, boolean planner, boolean admin, String password, boolean verification)
            throws MailNotUniqueException {
        checkMailUnique("", mail);
        User user = new User(mail, passwordEncoder.encode(password), preName, name, tel, false, verification);
        user.setPlannerActive(planner);
        user.setClientActive(client);
        user.setAdmin(admin);
        userRepository.save(user);
        if (verification) {
            mailGeneratorComponent.accountVerification(user);
        }
        return user;
    }

    public void activatePlanner(User user) {
        user.setPlannerActive(true);
        userRepository.save(user);
    }

    public void activateClient(User user) {
        user.setClientActive(true);
        userRepository.save(user);
    }

    public void updatePlannerSettings(PlannerSettings settingsNew, User user) throws UserNotPlannerException {
        PlannerSettings settings = getPlanner(user).getSettings();
        try {
            settings.update(settingsNew);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        plannerSettingsRepository.save(settings);
    }

    public void updateClientSettings(ClientSettings settingsNew, User user) throws UserNotFoundException {
        ClientSettings settings = getClient(user).getSettings();
        settings.update(settingsNew);
        clientSettingsRepository.save(settings);
    }

    public void updateUserData(UserDataRequest data, User user) {
        updateICalFeedsActive(user, data.getFeedsActive());
        user.updateData(data);
        userRepository.save(user);
    }

    private void updateICalFeedsActive(User user, Boolean iCalFeedsActive) {
        if(iCalFeedsActive) {
            if(user.getFeedsRef() == null) {
                user.setFeedsRef(org.apache.commons.codec.digest.DigestUtils.sha512Hex(passwordGeneratorComponent.generatePassword()));
            }
        } else {
            if(user.getFeedsRef() != null) {
                user.setFeedsRef(null);
            }
        }
    }

    public boolean updatePw(String pw, String newPw, User user) {
        if (passwordEncoder.matches(pw, user.getPassword())) {
            user.setPwHash(passwordEncoder.encode(newPw));
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public void renewTokenId(User user) {
        user.renewTokenKey();
        userRepository.save(user);
    }

    public void setMailChange(User user, String newMail) throws MailNotUniqueException {
        checkMailUnique("", newMail);
        user.setMailChange(newMail);
        userRepository.save(user);
        mailGeneratorComponent.mailVerification(user);
    }

    public void clearMailChange(User user) {
        user.clearMailChange();
        userRepository.save(user);
    }

    public void clearAccountVerification(User user) {
        user.clearAccountVerification();
        userRepository.save(user);
    }

    public void mailVerification(Integer userId, String code)
            throws UserNotFoundException, MailNotUniqueException, VerificationNotInProgressException, VerificationCodeFailedException {
        User user = getUserById(userId);
        checkMailUnique(user.getMail(), user.getMailChange());
        try {
            user.mailVerification(code);
            userRepository.save(user);
        } catch (Exception e) {
            verificationExceptionHandling(e);
        }
    }

    public void accountVerification(Integer userId, String code, String password)
            throws UserNotFoundException, VerificationNotInProgressException, VerificationCodeFailedException {
        User user = getUserById(userId);
        try {
            user.accountVerification(code);
            user.setPwHash(passwordEncoder.encode(password));
            userRepository.save(user);
        } catch (Exception e) {
            verificationExceptionHandling(e);
        }
    }

    private void verificationExceptionHandling(Exception e)
            throws VerificationNotInProgressException, VerificationCodeFailedException {
        if (e.getMessage().equals(User.ERR_NO_VERIFICATION)) {
            throw new VerificationNotInProgressException();
        }
        if (e.getMessage().equals(User.ERR_VERIFICATION_INVALID)) {
            throw new VerificationCodeFailedException();
        }
    }

    public void changeAccount(AccountRequest request) throws MailNotUniqueException, UserNotFoundException {
        User user = getUserById(request.getId());
        checkMailUnique(user.getMail(), request.getMail());
        user.updateAccount(request);
        userRepository.save(user);
    }

    public void accountTransaction(AccountTransactionRequest request) throws UserNotFoundException {
        User user = getUserById(request.getId());
        if (request.getCancelMailChange()) {
            clearMailChange(user);
        }
        if (request.getManualVerification()) {
            clearAccountVerification(user);
        }
    }

    public void passwordForgotten(String mail) throws UserNotFoundException {
        User user = getUserByUsername(mail);
        final String password = passwordGeneratorComponent.generatePassword();
        user.setPwHash(passwordEncoder.encode(password));
        userRepository.save(user);
        mailGeneratorComponent.resetPassword(user, password);
    }

    public void resetPassword(Integer userId, String code, String password) throws Exception {
        User user = getUserById(userId);
        if (!updatePw(new String(Base64.getDecoder().decode(code)), password, user)) {
            throw new Exception();
        }
    }

    public void deleteUser(Integer id) throws UserNotFoundException {
        deleteUser(getUserById(id));
    }

    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    private void checkMailUnique(String mail, String mailNew) throws MailNotUniqueException {
        if (!mail.equals(mailNew)) {
            try {
                getUserByUsername(mailNew);
            } catch (Exception ignored) {
                return;
            }
            throw new MailNotUniqueException();
        }
    }

}
