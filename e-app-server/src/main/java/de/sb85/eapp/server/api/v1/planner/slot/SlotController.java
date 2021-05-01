package de.sb85.eapp.server.api.v1.planner.slot;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.api.ControllerBasics;
import de.sb85.eapp.server.api.v1.ReferenceResponse;
import de.sb85.eapp.server.services.ical.ICalComponent;
import de.sb85.eapp.server.services.slot.SlotService;
import de.sb85.eapp.server.services.slot.data.Slot;
import de.sb85.eapp.server.services.slot.exceptions.PeriodNotFreeException;
import de.sb85.eapp.server.services.slot.exceptions.SlotNotFoundException;
import de.sb85.eapp.server.services.user.UserService;
import de.sb85.eapp.server.services.user.exeptions.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Optional;

@RestController
@CrossOrigin(origins = ControllerBasics.CROSS_ORIGIN)
@RequestMapping(ApplicationConfig.API_V1_PLANNER_SLOT)
public class SlotController extends ControllerBasics {

    private final SlotService slotService;
    private final ICalComponent iCalComponent;

    protected SlotController(UserService userService, SlotService slotService, ICalComponent iCalComponent) {
        super(userService);
        this.slotService = slotService;
        this.iCalComponent = iCalComponent;
    }

    @GetMapping
    public ResponseEntity<?> get(
            @RequestParam Optional<Long> start, @RequestParam Optional<Long> stop, Principal principal) {
        try {
            return new ResponseEntity<>(SlotResponse.transfer(
                    slotService.find(userService.getPlanner(getUser(principal)), start, stop), userService),
                    HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

    @PutMapping
    public ResponseEntity<?> put(Principal principal, @RequestBody SlotMoveRequest slotRequest) {
        try {
            return new ResponseEntity<>(new SlotResponse(
                    slotService.moveSlot(findSlotAndCheck(principal, slotRequest.getId()),
                            slotRequest.getStart(), slotRequest.getDuration(), slotRequest.getNotify()), userService),
                    HttpStatus.ACCEPTED);
        } catch (PeriodNotFreeException e) {
            return notFoundError(e);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

    @PostMapping
    public ResponseEntity<?> post(Principal principal, @RequestBody ArrayList<SlotCreateRequest> slotRequest) {
        try {
            return new ResponseEntity<>(SlotResponse.transfer(
                    slotService.createSlot(userService.getPlanner(getUser(principal)), slotRequest), userService),
                    HttpStatus.ACCEPTED);
        } catch (PeriodNotFreeException e) {
            return notFoundError(e);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> put(@PathVariable("id") Integer id) {
        try {
            return new ResponseEntity<>(
                    new ReferenceResponse(iCalComponent.createICalDownloadPlanner(slotService.getById(id))),
                    HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(Principal principal, @PathVariable("id") Integer id, @RequestParam Optional<Boolean> notify) {
        Boolean notifyBool = false;
        if (notify.isPresent()) notifyBool = notify.get();
        try {
            slotService.deleteSlot(findSlotAndCheck(principal, id), notifyBool);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return internalServerError(e);
        }
    }

    private Slot findSlotAndCheck(Principal principal, Integer id) throws SlotNotFoundException, UserNotFoundException {
        Slot slot = slotService.getById(id);
        if (getUser(principal).getPlanner() == slot.getPlanner()) {
            return slot;
        }
        throw new SlotNotFoundException();
    }

}
