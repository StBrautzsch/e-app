package de.sb85.eapp.server.api.v1.booking.appointment_anonym;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.api.ControllerBasics;
import de.sb85.eapp.server.api.v1.AppointmentResponse;
import de.sb85.eapp.server.api.v1.ReferenceResponse;
import de.sb85.eapp.server.services.ReferenceNotFoundException;
import de.sb85.eapp.server.services.booking.BookingService;
import de.sb85.eapp.server.services.ical.ICalComponent;
import de.sb85.eapp.server.services.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = ControllerBasics.CROSS_ORIGIN)
@RequestMapping(ApplicationConfig.API_V1_BOOKING_APPOINTMENT)
public class AppointmentAnonymController extends ControllerBasics {

    private final BookingService bookingService;
    private final ICalComponent iCalComponent;

    protected AppointmentAnonymController(UserService userService, BookingService bookingService, ICalComponent iCalComponent) {
        super(userService);
        this.bookingService = bookingService;
        this.iCalComponent = iCalComponent;
    }

    @GetMapping("/{reference}")
    public ResponseEntity<?> getSlot(@PathVariable("reference") String reference) {
        try {
            return new ResponseEntity<>(new AppointmentResponse(
                    bookingService.findSlotForBookingByReference(reference), userService),
                    HttpStatus.ACCEPTED);
        } catch (ReferenceNotFoundException e) {
            return notFoundError(e);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

    @PutMapping("/{reference}")
    public ResponseEntity<?> put(@PathVariable("reference") String reference) {
        try {
            return new ResponseEntity<>(
                    new ReferenceResponse(
                            iCalComponent.createICalDownloadClient(bookingService.findSlotForBookingByReference(reference))),
                    HttpStatus.ACCEPTED);
        } catch (ReferenceNotFoundException e) {
            return notFoundError(e);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

    @DeleteMapping("/{reference}")
    public ResponseEntity<?> delete(@PathVariable("reference") String reference) {
        try {
            bookingService.storno(reference);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (ReferenceNotFoundException e) {
            return notFoundError(e);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

}
