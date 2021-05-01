package de.sb85.eapp.server.api.v1.tools;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.api.ControllerBasics;
import de.sb85.eapp.server.services.ReferenceNotFoundException;
import de.sb85.eapp.server.services.ical.ICalComponent;
import de.sb85.eapp.server.services.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = ControllerBasics.CROSS_ORIGIN)
@RequestMapping(ApplicationConfig.API_V1_ICAL)
public class ICalController extends ICalControllerBasics {

    protected ICalController(UserService userService, ICalComponent iCalComponent) {
        super(userService, iCalComponent);
    }

    @GetMapping("/{reference}")
    public ResponseEntity<?> ical(@PathVariable("reference") String reference) {
        try {
            final byte[] data = iCalComponent.getICalDownloadAsBytes(reference);
            return new ResponseEntity<>(data, createICalHeader(data), HttpStatus.OK);
        } catch (ReferenceNotFoundException e) {
            return notFoundError(e);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

}
