package de.sb85.eapp.server.api.v1.client.appointment;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.api.ControllerBasics;
import de.sb85.eapp.server.api.v1.AppointmentResponse;
import de.sb85.eapp.server.api.v1.BookingRequest;
import de.sb85.eapp.server.api.v1.ReferenceResponse;
import de.sb85.eapp.server.services.booking.BookingService;
import de.sb85.eapp.server.services.booking.exceptions.SlotNotBookableException;
import de.sb85.eapp.server.services.ical.ICalComponent;
import de.sb85.eapp.server.services.slot.SlotService;
import de.sb85.eapp.server.services.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@CrossOrigin(origins = ControllerBasics.CROSS_ORIGIN)
@RequestMapping(ApplicationConfig.API_V1_CLIENT_APPOINTMENT)
public class AppointmentController extends ControllerBasics {

    private final BookingService bookingService;
    private final ICalComponent iCalComponent;
    private final SlotService slotService;

    protected AppointmentController(UserService userService, BookingService bookingService, ICalComponent iCalComponent, SlotService slotService) {
        super(userService);
        this.bookingService = bookingService;
        this.iCalComponent = iCalComponent;
        this.slotService = slotService;
    }

    @GetMapping
    public ResponseEntity<?> get(Principal principal) {
        try {
            return new ResponseEntity<>(
                    AppointmentResponse.transfer(
                            bookingService.findAppointmentsByClient(
                                    userService.getClient(getUser(principal))), userService), HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

    @PostMapping
    public ResponseEntity<?> booking(Principal principal, @RequestBody BookingRequest request) {
        try {
            return new ResponseEntity<>(
                    new AppointmentResponse(bookingService.bookingAuth(
                            request, userService.getClient(getUser(principal))), userService)
                    , HttpStatus.ACCEPTED);
        } catch (SlotNotBookableException e) {
            return notFoundError(e);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> put(@PathVariable("id") Integer id) {
        try {
            return new ResponseEntity<>(
                    new ReferenceResponse(iCalComponent.createICalDownloadClient(slotService.getById(id))),
                    HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(Principal principal, @PathVariable("id") Integer id) {
        try {
            bookingService.storno(id, userService.getClient(getUser(principal)));
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

}
