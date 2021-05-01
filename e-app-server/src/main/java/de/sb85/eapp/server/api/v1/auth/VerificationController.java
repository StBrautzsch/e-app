package de.sb85.eapp.server.api.v1.auth;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.api.ControllerBasics;
import de.sb85.eapp.server.api.v1.AccountRequest;
import de.sb85.eapp.server.api.v1.UserMailRequest;
import de.sb85.eapp.server.services.user.UserService;
import de.sb85.eapp.server.services.user.exeptions.MailNotUniqueException;
import de.sb85.eapp.server.services.user.exeptions.UserNotFoundException;
import de.sb85.eapp.server.services.user.exeptions.VerificationCodeFailedException;
import de.sb85.eapp.server.services.user.exeptions.VerificationNotInProgressException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = ControllerBasics.CROSS_ORIGIN)
public class VerificationController extends ControllerBasics {

    public VerificationController(UserService userService) {
        super(userService);
    }

    @PostMapping(ApplicationConfig.API_V1_AUTH_MAIL_VERIFICATION)
    public ResponseEntity<?> mailVerification(@RequestBody VerificationRequest request) {
        try {
            userService.mailVerification(request.getUserId(), request.getVerifikationCode());
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (MailNotUniqueException | VerificationNotInProgressException | VerificationCodeFailedException e) {
            return notFoundError(e);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

    @PostMapping(ApplicationConfig.API_V1_AUTH_ACCOUNT_VERIFICATION)
    public ResponseEntity<?> accountVerification(@RequestBody VerificationRequest request) {
        try {
            userService.accountVerification(request.getUserId(), request.getVerifikationCode(), request.getPassword());
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (VerificationNotInProgressException | VerificationCodeFailedException e) {
            return notFoundError(e);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

    @PostMapping(ApplicationConfig.API_V1_AUTH_ACCOUNT)
    public ResponseEntity<?> createClientAccount(@RequestBody AccountRequest request) {
        try {
            userService.createClientUser(request);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (MailNotUniqueException e) {
            return notFoundError(e);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

    @PutMapping(ApplicationConfig.API_V1_AUTH_ACCOUNT)
    public ResponseEntity<?> passwordForgotten(@RequestBody UserMailRequest request) {
        try {
            userService.passwordForgotten(request.getMail());
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (UserNotFoundException e) {
            return notFoundError(e);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

    @PatchMapping(ApplicationConfig.API_V1_AUTH_ACCOUNT)
    public ResponseEntity<?> resetPassword(@RequestBody VerificationRequest request) {
        try {
            userService.resetPassword(request.getUserId(), request.getVerifikationCode(), request.getPassword());
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

}
