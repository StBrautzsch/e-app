package de.sb85.eapp.server.api.v1.tools;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.api.ControllerBasics;
import de.sb85.eapp.server.services.ical.ICalComponent;
import de.sb85.eapp.server.services.ical.ICalFeedComponent;
import de.sb85.eapp.server.services.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;

@RestController
@CrossOrigin(origins = ControllerBasics.CROSS_ORIGIN)
public class ICalFeedController extends ICalControllerBasics {

    private final ICalFeedComponent iCalFeedComponent;

    protected ICalFeedController(UserService userService, ICalComponent iCalComponent, ICalFeedComponent iCalFeedComponent) {
        super(userService, iCalComponent);
        this.iCalFeedComponent = iCalFeedComponent;
    }

    @GetMapping(ApplicationConfig.API_V1_ICAL_FEED + "/{reference}")
    public ResponseEntity<?> ical(@PathVariable("reference") String reference) {
        try {
            final byte[] data = iCalFeedComponent.generateFeeds(reference).getBytes(StandardCharsets.UTF_8);
            return new ResponseEntity<>(data, createICalHeader(data), HttpStatus.OK);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

}
