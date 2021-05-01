package de.sb85.eapp.server.services.ical;

import de.sb85.eapp.server.services.ComponentBasics;
import de.sb85.eapp.server.services.ReferenceNotFoundException;
import de.sb85.eapp.server.services.booking.exceptions.BookingNotValidException;
import de.sb85.eapp.server.services.ical.data.ICalDownload;
import de.sb85.eapp.server.services.mail.ThymeleafComponent;
import de.sb85.eapp.server.services.slot.data.Slot;
import de.sb85.eapp.server.services.user.UserToolsComponent;
import net.fortuna.ical4j.model.DateTime;
import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.model.parameter.FmtType;
import net.fortuna.ical4j.model.property.*;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Component
public class ICalComponent extends ComponentBasics {

    private final static String TEMPLATE_CLIENT = "ical_client.html";
    private final static String TEMPLATE_PLANNER = "ical_planner.html";

    private static final String EVENT_NAME_FREE = "Freier E-APP-Slot";
    private static final String EVENT_NAME_DEFAULT = "E-APP-Termin";
    private static final String EVENT_NAME_PREFIX = EVENT_NAME_DEFAULT + " - ";
    private static final String EVENT_NAME_DESC = EVENT_NAME_DEFAULT + " mit ";
    private static final String PROD_ID = "E-APP";
    private static final String X_PROPERTY_DESC = "X-ALT-DESC";

    private final ICalRepository iCalRepository;
    private final UserToolsComponent userToolsComponent;
    private final ThymeleafComponent thymeleafComponent;

    public ICalComponent(ICalRepository iCalRepository, UserToolsComponent userToolsComponent,
                         ThymeleafComponent thymeleafComponent) {
        this.iCalRepository = iCalRepository;
        this.userToolsComponent = userToolsComponent;
        this.thymeleafComponent = thymeleafComponent;
    }

    public String createICalDownloadPlanner(Slot slot) throws BookingNotValidException {
        ICalDownload download = new ICalDownload(createICalPlanner(slot));
        iCalRepository.save(download);
        return download.getReference();
    }

    public String createICalDownloadClient(Slot slot) {
        ICalDownload download = new ICalDownload(createICalClient(slot));
        iCalRepository.save(download);
        return download.getReference();
    }

    public String createICalPlanner(Slot slot) throws BookingNotValidException {
        net.fortuna.ical4j.model.Calendar ics = createBasicICal();
        ics.getComponents().add(createPlannerEvent(slot));
        return ics.toString();
    }

    public String createICalFeed(Optional<Iterable<Slot>> getBookedPlannerSlots, Optional<Iterable<Slot>> getClientAppointments) {
        net.fortuna.ical4j.model.Calendar ics = createBasicICal();
        setPlannerEventsForFeeds(getBookedPlannerSlots, ics);
        setClientEventsForFeeds(getClientAppointments, ics);
        return ics.toString();
    }

    private void setPlannerEventsForFeeds(Optional<Iterable<Slot>> getBookedPlannerSlots, net.fortuna.ical4j.model.Calendar ics) {
        getBookedPlannerSlots.ifPresent(slots -> slots.forEach(slot -> {
            try {
                ics.getComponents().add(createPlannerEvent(slot));
            } catch (BookingNotValidException e) {
                logger.error(e.getMessage());
            }
        }));
    }

    private void setClientEventsForFeeds(Optional<Iterable<Slot>> getClientAppointments, net.fortuna.ical4j.model.Calendar ics) {
        getClientAppointments.ifPresent(slots -> slots.forEach(slot -> {
            ics.getComponents().add(createClientEvent(slot));
        }));
    }

    public String createICalClient(Slot slot) {
        net.fortuna.ical4j.model.Calendar ics = createBasicICal();
        ics.getComponents().add(createClientEvent(slot));
        return ics.toString();
    }

    private net.fortuna.ical4j.model.Calendar createBasicICal() {
        net.fortuna.ical4j.model.Calendar ics = new net.fortuna.ical4j.model.Calendar();
        ics.getProperties().add(new ProdId(PROD_ID));
        ics.getProperties().add(new Uid(UUID.randomUUID().toString()));
        ics.getProperties().add(Version.VERSION_2_0);
        ics.getProperties().add(CalScale.GREGORIAN);
        return ics;
    }

    public ICalDownload getICalDownloadByReference(String reference) throws ReferenceNotFoundException {
        ICalDownload cal = iCalRepository.findByReference(reference);
        if (cal == null) {
            throw new ReferenceNotFoundException();
        }
        return cal;
    }

    public byte[] getICalDownloadAsBytes(String reference) throws ReferenceNotFoundException {
        return getICalDownloadByReference(reference).getIcal().getBytes(StandardCharsets.UTF_8);
    }

    public byte[] getICalDownloadAsBytes(ICalDownload ical) {
        return ical.getIcal().getBytes(StandardCharsets.UTF_8);
    }

    private VEvent createBasicEvent(Slot slot) {
        DateTime start = new DateTime(slot.getStart().getTime());
        start.setUtc(true);
        DateTime end = new DateTime(slot.getEnd().getTime());
        end.setUtc(true);
        VEvent event = new VEvent(start, end, getEventName(slot));
        event.getProperties().add(Method.PUBLISH);
        event.getProperties().add(new Uid(UUID.randomUUID().toString()));
        return event;
    }

    private VEvent createPlannerEvent(Slot slot) throws BookingNotValidException {
        VEvent event = createBasicEvent(slot);
        event.getProperties().add(new Description(EVENT_NAME_DESC + userToolsComponent.getClientName(slot)
                + " (" + userToolsComponent.getClientMail(slot) + ") : " + thymeleafComponent.getPlannerLink(slot)));
        event.getProperties().add(createPlannerXProperty(slot));
        return event;
    }

    private VEvent createClientEvent(Slot slot) {
        VEvent event = createBasicEvent(slot);
        event.getProperties().add(new Description(EVENT_NAME_DESC + userToolsComponent.getPlannerName(slot)
                + " (" + userToolsComponent.getPlannerMail(slot) + ") : " + thymeleafComponent.getClientLink(slot)));
        event.getProperties().add(createClientXProperty(slot));
        return event;
    }

    private XProperty createClientXProperty(Slot slot) {
        XProperty p = createBasicXProperty();
        Map<String, Object> templateModel = new HashMap<>();
        try {
            thymeleafComponent.setSlotData(slot, userToolsComponent.getPlannerName(slot), userToolsComponent.getClientName(slot), templateModel);
            thymeleafComponent.setClientLink(slot, templateModel);
        } catch (Exception ignored) {
        }
        p.setValue(thymeleafComponent.createHtml(templateModel, TEMPLATE_CLIENT));
        return p;
    }

    private XProperty createPlannerXProperty(Slot slot) {
        XProperty p = createBasicXProperty();
        Map<String, Object> templateModel = new HashMap<>();
        try {
            thymeleafComponent.setSlotData(slot, userToolsComponent.getPlannerName(slot), userToolsComponent.getClientName(slot), templateModel);
            thymeleafComponent.setPlannerLink(slot, templateModel);
        } catch (Exception ignored) {
        }
        p.setValue(thymeleafComponent.createHtml(templateModel, TEMPLATE_PLANNER));
        return p;
    }

    private XProperty createBasicXProperty() {
        XProperty p = new XProperty(X_PROPERTY_DESC);
        p.getParameters().add(new FmtType(MediaType.TEXT_HTML_VALUE));
        return p;
    }

    private String getEventName(Slot slot) {
        if (slot.isFree()) {
            return EVENT_NAME_FREE;
        }
        if (slot.getBooking().getRemark().isEmpty()) {
            return EVENT_NAME_DEFAULT;
        }
        return EVENT_NAME_PREFIX + slot.getBooking().getRemark();
    }

}
