package de.sb85.eapp.server.api.v1.client;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.api.ControllerBasics;
import de.sb85.eapp.server.services.user.UserService;
import de.sb85.eapp.server.services.user.data.ClientSettings;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@CrossOrigin(origins = ControllerBasics.CROSS_ORIGIN)
public class ClientController extends ControllerBasics {

    protected ClientController(UserService userService) {
        super(userService);
    }

    @GetMapping(ApplicationConfig.API_V1_CLIENT)
    public ResponseEntity<?> client(Principal principal) {
        try {
            return new ResponseEntity<>(new UserClientResponse(getUser(principal)), HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

    @PutMapping(ApplicationConfig.API_V1_CLIENT_SETTINGS)
    public ResponseEntity<?> settings(Principal principal, @RequestBody ClientSettings settingsNew) {
        try {
            userService.updateClientSettings(settingsNew, getUser(principal));
            return new ResponseEntity<>(new UserClientResponse(getUser(principal)), HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

}
