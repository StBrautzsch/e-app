package de.sb85.eapp.server.api.v1.tools;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.api.ControllerBasics;
import de.sb85.eapp.server.services.ical.ICalComponent;
import de.sb85.eapp.server.services.user.UserService;
import org.springframework.http.HttpHeaders;

public abstract class ICalControllerBasics extends ControllerBasics {

    protected static final String ICAL_DISPOSITION = "attachment; filename=";
    protected static final String ICAL_FILE = "e-app.ics";

    protected final ICalComponent iCalComponent;

    public ICalControllerBasics(UserService userService, ICalComponent iCalComponent) {
        super(userService);
        this.iCalComponent = iCalComponent;
    }

    protected HttpHeaders createICalHeader(byte[] data) {
        HttpHeaders header = new HttpHeaders();
        header.setContentType(ApplicationConfig.ICAL_MEDIA_TYPE);
        header.set(HttpHeaders.CONTENT_DISPOSITION, ICAL_DISPOSITION + ICAL_FILE);
        header.setContentLength(data.length);
        return header;
    }

}
