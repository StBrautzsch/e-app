package de.sb85.eapp.server.api.v1.admin.account;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.api.ControllerBasics;
import de.sb85.eapp.server.api.v1.AccountRequest;
import de.sb85.eapp.server.services.booking.BookingService;
import de.sb85.eapp.server.services.slot.SlotService;
import de.sb85.eapp.server.services.user.UserService;
import de.sb85.eapp.server.services.user.exeptions.MailNotUniqueException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = ControllerBasics.CROSS_ORIGIN)
@RequestMapping(ApplicationConfig.API_V1_ADMIN_ACCOUNT)
public class AccountController extends ControllerBasics {

    private final BookingService bookingService;
    private final SlotService slotService;

    protected AccountController(UserService userService, BookingService bookingService, SlotService slotService) {
        super(userService);
        this.bookingService = bookingService;
        this.slotService = slotService;
    }

    @GetMapping
    public ResponseEntity<?> get() {
        try {
            return new ResponseEntity<>(AccountResponse.transfer(userService.findAllBySystemUserFalseOrderByNameAscPreNameAsc(),
                    bookingService, slotService), HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

    @PutMapping
    public ResponseEntity<?> changeAccount(@RequestBody AccountRequest request) {
        try {
            userService.changeAccount(request);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (MailNotUniqueException e) {
            return notFoundError(e);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody AccountRequest request) {
        try {
            userService.createUser(request);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (MailNotUniqueException e) {
            return notFoundError(e);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

    @PatchMapping
    public ResponseEntity<?> accountTransaction(@RequestBody AccountTransactionRequest request) {
        try {
            userService.accountTransaction(request);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        try {
            userService.deleteUser(id);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

}
