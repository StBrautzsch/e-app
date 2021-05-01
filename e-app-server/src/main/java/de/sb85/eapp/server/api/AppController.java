package de.sb85.eapp.server.api;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.services.user.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@CrossOrigin(origins = "*")
public class AppController extends ControllerBasics {

    @Value("${url.planner}")
    private String urlPlanner;

    @Value("${url.client}")
    private String urlClient;

    protected AppController(UserService userService) {
        super(userService);
    }

    @GetMapping
    @RequestMapping(ApplicationConfig.API_START_CLIENT_APP)
    public void client(HttpServletResponse httpServletResponse) throws IOException {
        httpServletResponse.sendRedirect(urlClient);
    }

    @GetMapping
    @RequestMapping(ApplicationConfig.API_START_PLANNER_APP)
    public void planner(HttpServletResponse httpServletResponse) throws IOException {
        httpServletResponse.sendRedirect(urlPlanner);
    }

}
