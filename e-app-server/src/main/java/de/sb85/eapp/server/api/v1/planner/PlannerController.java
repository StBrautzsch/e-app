package de.sb85.eapp.server.api.v1.planner;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.api.ControllerBasics;
import de.sb85.eapp.server.services.user.UserService;
import de.sb85.eapp.server.services.user.data.PlannerSettings;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@CrossOrigin(origins = ControllerBasics.CROSS_ORIGIN)
public class PlannerController extends ControllerBasics {

    protected PlannerController(UserService userService) {
        super(userService);
    }

    @GetMapping(ApplicationConfig.API_V1_PLANNER)
    public ResponseEntity<?> planner(Principal principal) {
        try {
            return new ResponseEntity<>(new UserPlannerResponse(getUser(principal)), HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

    @PutMapping(ApplicationConfig.API_V1_PLANNER_SETTINGS)
    public ResponseEntity<?> settings(Principal principal, @RequestBody PlannerSettings settingsNew) {
        try {
            userService.updatePlannerSettings(settingsNew, getUser(principal));
            return new ResponseEntity<>(new UserPlannerResponse(getUser(principal)), HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

}
