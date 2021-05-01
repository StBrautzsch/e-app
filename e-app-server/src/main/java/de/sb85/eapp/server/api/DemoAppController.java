package de.sb85.eapp.server.api;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.services.user.UserService;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@Profile("demo")
@CrossOrigin(origins = "*")
public class DemoAppController extends ControllerBasics {

    private final static String DEMO_ROUTE_LOGIN = "/login";
    private final static String DEMO_ROUTE_LOGIN_RENEW = "/login-renew";
    private final static String DEMO_ROUTE_BOOKING_ANONYM = "/booking_anonym";
    private final static String DEMO_ROUTE_BOOKING = "/booking";
    private final static String DEMO_ROUTE_CALENDAR = "/calendar";
    private final static String DEMO_ROUTE_AGENDA = "/agenda";
    private final static String DEMO_ROUTE_SETTINGS = "/settings";
    private final static String DEMO_ROUTE_ACCOUNT = "/account";
    private final static String DEMO_ROUTE_ADMIN = "/admin";
    private final static String DEMO_ROUTE_SHARE = "/share";
    private final static String DEMO_ROUTE_INFO = "/info";

    protected DemoAppController(UserService userService) {
        super(userService);
    }

    @RequestMapping(value = {
            ApplicationConfig.DEMO_CLIENT_APP,
            ApplicationConfig.DEMO_CLIENT_APP + DEMO_ROUTE_LOGIN,
            ApplicationConfig.DEMO_CLIENT_APP + DEMO_ROUTE_LOGIN_RENEW,
            ApplicationConfig.DEMO_CLIENT_APP + DEMO_ROUTE_BOOKING_ANONYM,
            ApplicationConfig.DEMO_CLIENT_APP + DEMO_ROUTE_BOOKING,
            ApplicationConfig.DEMO_CLIENT_APP + DEMO_ROUTE_CALENDAR,
            ApplicationConfig.DEMO_CLIENT_APP + DEMO_ROUTE_AGENDA,
            ApplicationConfig.DEMO_CLIENT_APP + DEMO_ROUTE_SETTINGS,
            ApplicationConfig.DEMO_CLIENT_APP + DEMO_ROUTE_ACCOUNT,
            ApplicationConfig.DEMO_CLIENT_APP + DEMO_ROUTE_ADMIN,
            ApplicationConfig.DEMO_CLIENT_APP + DEMO_ROUTE_SHARE,
            ApplicationConfig.DEMO_CLIENT_APP + DEMO_ROUTE_INFO})
    public Object demoClientApp(HttpServletRequest request, HttpServletResponse response) {
        if (request.getMethod().equalsIgnoreCase(HttpMethod.GET.name())) {
            response.setStatus(HttpStatus.OK.value());
            return "forward:" + ApplicationConfig.DEMO_CLIENT_APP + "/index.html";
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(value = {
            ApplicationConfig.DEMO_PLANNER_APP,
            ApplicationConfig.DEMO_PLANNER_APP + DEMO_ROUTE_LOGIN,
            ApplicationConfig.DEMO_PLANNER_APP + DEMO_ROUTE_LOGIN_RENEW,
            ApplicationConfig.DEMO_PLANNER_APP + DEMO_ROUTE_BOOKING_ANONYM,
            ApplicationConfig.DEMO_PLANNER_APP + DEMO_ROUTE_BOOKING,
            ApplicationConfig.DEMO_PLANNER_APP + DEMO_ROUTE_CALENDAR,
            ApplicationConfig.DEMO_PLANNER_APP + DEMO_ROUTE_AGENDA,
            ApplicationConfig.DEMO_PLANNER_APP + DEMO_ROUTE_SETTINGS,
            ApplicationConfig.DEMO_PLANNER_APP + DEMO_ROUTE_ACCOUNT,
            ApplicationConfig.DEMO_PLANNER_APP + DEMO_ROUTE_ADMIN,
            ApplicationConfig.DEMO_PLANNER_APP + DEMO_ROUTE_SHARE,
            ApplicationConfig.DEMO_PLANNER_APP + DEMO_ROUTE_INFO})
    public Object demoPlannerApp(HttpServletRequest request, HttpServletResponse response) {
        if (request.getMethod().equalsIgnoreCase(HttpMethod.GET.name())) {
            response.setStatus(HttpStatus.OK.value());
            return "forward:" + ApplicationConfig.DEMO_PLANNER_APP + "/index.html";
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
