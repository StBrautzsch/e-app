package de.sb85.eapp.server.security.lti;

import de.sb85.eapp.server.security.jwt.JwtTokenComponent;
import de.sb85.eapp.server.security.lti.data.LtiRequest;
import de.sb85.eapp.server.security.lti.exceptions.KeyInvalidException;
import de.sb85.eapp.server.security.lti.exceptions.LtiRequestInvalidException;
import de.sb85.eapp.server.security.lti.exceptions.UserDeactivatedException;
import de.sb85.eapp.server.services.ComponentBasics;
import de.sb85.eapp.server.services.tools.PasswordGeneratorComponent;
import de.sb85.eapp.server.services.user.UserService;
import de.sb85.eapp.server.services.user.data.User;
import de.sb85.eapp.server.services.user.exeptions.MailNotUniqueException;
import de.sb85.eapp.server.services.user.exeptions.UserNotFoundException;
import org.imsglobal.lti.launch.LtiOauthVerifier;
import org.imsglobal.lti.launch.LtiVerificationException;
import org.imsglobal.lti.launch.LtiVerificationResult;
import org.imsglobal.lti.launch.LtiVerifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component
public class LtiMoodleComponent extends ComponentBasics {

    @Value("${lti.moodle.planner.key}")
    private String plannerKey;

    @Value("${lti.moodle.planner.secret}")
    private String plannerSecret;

    @Value("${lti.moodle.client.key}")
    private String clientKey;

    @Value("${lti.moodle.client.secret}")
    private String clientSecret;

    private final UserService userService;
    private final JwtTokenComponent jwtTokenComponent;
    private final PasswordGeneratorComponent passwordGeneratorComponent;

    public LtiMoodleComponent(UserService userService, JwtTokenComponent jwtTokenComponent, PasswordGeneratorComponent passwordGeneratorComponent) {
        this.userService = userService;
        this.jwtTokenComponent = jwtTokenComponent;
        this.passwordGeneratorComponent = passwordGeneratorComponent;
    }

    public String createLoginTokenForClient(HttpServletRequest request)
            throws KeyInvalidException, LtiRequestInvalidException, LtiVerificationException, MailNotUniqueException, UserDeactivatedException {
        LtiRequest ltiRequest = new LtiRequest(request);
        check(request, ltiRequest, clientKey, clientSecret);
        User user = getUser(ltiRequest, false);
        checkForClient(user, ltiRequest);
        return createLoginToken(user);
    }

    public String createLoginTokenForPlanner(HttpServletRequest request)
            throws LtiVerificationException, KeyInvalidException, LtiRequestInvalidException, MailNotUniqueException, UserDeactivatedException {
        LtiRequest ltiRequest = new LtiRequest(request);
        check(request, ltiRequest, plannerKey, plannerSecret);
        User user = getUser(ltiRequest, true);
        checkForPlanner(user, ltiRequest);
        return createLoginToken(user);
    }

    private void checkForClient(User user, LtiRequest ltiRequest) {
        if (!user.isClient()) {
            logger.info("Activate Client for " + user.getMail() + " (" + ltiRequest.getUrl() + " / " + ltiRequest.getTitle() + ")");
            userService.activateClient(user);
        }
    }

    private void checkForPlanner(User user, LtiRequest ltiRequest) {
        if (!user.isPlanner()) {
            logger.info("Activate Planner for " + user.getMail() + " (" + ltiRequest.getUrl() + " / " + ltiRequest.getTitle() + ")");
            userService.activatePlanner(user);
        }
    }

    private String createLoginToken(User user) {
        return jwtTokenComponent.generateToken(user, jwtTokenComponent.calcShortExpiration());
    }

    private void check(HttpServletRequest request, LtiRequest ltiRequest, String key, String secret)
            throws KeyInvalidException, LtiVerificationException {
        checkKey(ltiRequest.getKey(), key);
        verify(request, secret);
    }

    private User getUser(LtiRequest ltiRequest, boolean planner) throws MailNotUniqueException, UserDeactivatedException {
        try {
            User user = findUser(ltiRequest);
            if(user.isEnabled()) {
                return user;
            }
            throw new UserDeactivatedException();
        } catch (UserNotFoundException e) {
            return createUser(ltiRequest, planner);
        }
    }

    private User findUser(LtiRequest ltiRequest) throws UserNotFoundException {
        try {
            return userService.getUserMoodleById(ltiRequest.getId());
        } catch (UserNotFoundException e) {
            User user = userService.getUserByUsername(ltiRequest.getMail());
            logger.info("Set Moodle-Id for " + ltiRequest.getMail() + " (" + ltiRequest.getUrl() + " / " + ltiRequest.getTitle() + ")");
            userService.setMoodleId(user, ltiRequest.getId());
            return user;
        }
    }

    private User createUser(LtiRequest ltiRequest, boolean planner) throws MailNotUniqueException {
        logger.info("Create User for " + ltiRequest.getMail() + " (" + ltiRequest.getUrl() + " / " + ltiRequest.getTitle() + ")");
        final String password = passwordGeneratorComponent.generatePassword();
        User user = userService.createUser(
                ltiRequest.getMail(), password, ltiRequest.getPreName(), ltiRequest.getName(),
                "", true, planner, false);
        userService.setMoodleId(user, ltiRequest.getId());
        return user;
    }

    private void verify(HttpServletRequest request, String secret) throws LtiVerificationException {
        LtiVerifier ltiVerifier = new LtiOauthVerifier();
        LtiVerificationResult ltiResult = ltiVerifier.verify(request, secret);
        if (!ltiResult.getSuccess()) {
            throw new LtiVerificationException(ltiResult.getMessage(), new Exception());
        }
    }

    private void checkKey(String keyRequest, String key) throws KeyInvalidException {
        if (!key.equals(keyRequest)) {
            throw new KeyInvalidException();
        }
    }

}
