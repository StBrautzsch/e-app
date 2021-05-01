package de.sb85.eapp.server.api.v1.booking;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.api.ControllerBasics;
import de.sb85.eapp.server.services.booking.BookingService;
import de.sb85.eapp.server.services.booking.exceptions.SlotNotBookableException;
import de.sb85.eapp.server.services.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin(origins = ControllerBasics.CROSS_ORIGIN)
@RequestMapping(ApplicationConfig.API_V1_BOOKING)
public class BookingController extends ControllerBasics {

    protected BookingService bookingService;

    protected BookingController(UserService userService, BookingService bookingService) {
        super(userService);
        this.bookingService = bookingService;
    }

    @GetMapping
    public ResponseEntity<ArrayList<PlannerPersonResponse>> getPlannerPersons() {
        return new ResponseEntity<>(
                PlannerPersonResponse.transfer(bookingService.findPlanners()), HttpStatus.ACCEPTED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSlots(@PathVariable("id") Integer id){
        try {
            return new ResponseEntity<>(
                    BookingSlotResponse.transfer(bookingService.findSlots(id)), HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

    @PostMapping
    public ResponseEntity<?> postAnonym(@RequestBody BookingAnonymRequest request) {
        try {
            bookingService.bookingAnonym(request);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (SlotNotBookableException e) {
            return notFoundError(e);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

}
