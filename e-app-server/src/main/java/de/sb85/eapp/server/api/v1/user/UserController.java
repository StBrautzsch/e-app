package de.sb85.eapp.server.api.v1.user;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.api.ControllerBasics;
import de.sb85.eapp.server.api.v1.UserMailRequest;
import de.sb85.eapp.server.services.user.UserService;
import de.sb85.eapp.server.services.user.exeptions.MailNotUniqueException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@CrossOrigin(origins = ControllerBasics.CROSS_ORIGIN)
public class UserController extends ControllerBasics {

    protected UserController(UserService userService) {
        super(userService);
    }

    @PutMapping(ApplicationConfig.API_V1_USER_DATA)
    public ResponseEntity<?> updateUserData(Principal principal, @RequestBody UserDataRequest data) {
        try {
            userService.updateUserData(data, getUser(principal));
            return new ResponseEntity<>(data, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

    @PutMapping(ApplicationConfig.API_V1_USER_PW)
    public ResponseEntity<?> updatePw(Principal principal, @RequestBody UserPwRequest data) {
        try {
            return new ResponseEntity<>(
                    userService.updatePw(data.getPw(), data.getNewPw(), getUser(principal)), HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

    @PutMapping(ApplicationConfig.API_V1_USER_TOKEN)
    public ResponseEntity<?> renewTokenId(Principal principal) {
        try {
            userService.renewTokenId(getUser(principal));
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

    @PutMapping(ApplicationConfig.API_V1_USER_MAIL)
    public ResponseEntity<?> setMailChange(Principal principal, @RequestBody UserMailRequest mail) {
        try {
            userService.setMailChange(getUser(principal), mail.getMail());
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (MailNotUniqueException e) {
            return notFoundError(e);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

    @DeleteMapping(ApplicationConfig.API_V1_USER_MAIL)
    public ResponseEntity<?> clearMailChange(Principal principal) {
        try {
            userService.clearMailChange(getUser(principal));
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

}
