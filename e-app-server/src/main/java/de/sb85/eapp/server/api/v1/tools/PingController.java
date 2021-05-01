package de.sb85.eapp.server.api.v1.tools;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.api.ControllerBasics;
import de.sb85.eapp.server.services.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = ControllerBasics.CROSS_ORIGIN)
@RequestMapping(ApplicationConfig.API_V1_PING)
public class PingController extends ControllerBasics {

    private final ApplicationConfig applicationConfig;

    protected PingController(UserService userService, ApplicationConfig applicationConfig) {
        super(userService);
        this.applicationConfig = applicationConfig;
    }

    @GetMapping
    public ResponseEntity<String> ping() {
        return new ResponseEntity<>(applicationConfig.getName() + "-" + applicationConfig.getVersion(), HttpStatus.OK);
    }

}
