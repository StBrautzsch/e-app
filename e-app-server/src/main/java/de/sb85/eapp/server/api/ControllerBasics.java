package de.sb85.eapp.server.api;

import de.sb85.eapp.server.services.user.UserService;
import de.sb85.eapp.server.services.user.data.User;
import de.sb85.eapp.server.services.user.exeptions.UserNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.security.Principal;

public abstract class ControllerBasics {

    public final static String CROSS_ORIGIN = "*";

    protected final Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    protected final UserService userService;

    protected ControllerBasics(UserService userService) {
        this.userService = userService;
        logger.info(this.getClass().getName());
    }

    protected User getUser(Principal principal) throws UserNotFoundException {
        return userService.getUserByUsername(principal.getName());
    }

    protected ResponseEntity<?> notFoundError(Exception e) {
        logException(e);
        return new ResponseEntity<>(e.getClass().getSimpleName(), HttpStatus.NOT_FOUND);
    }

    protected ResponseEntity<?> internalServerError(Exception e) {
        logException(e);
        return new ResponseEntity<>(e.getClass().getSimpleName(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    protected void logException(Exception e) {
        if((e.getMessage() != null) && !e.getMessage().isEmpty()) {
            logger.error(e.getClass().getSimpleName() + "(" + e.getMessage() + ")");
        } else {
            logger.error(e.getClass().getSimpleName());
        }
    }

}
