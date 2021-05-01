package de.sb85.eapp.server.api;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.security.lti.LtiMoodleComponent;
import de.sb85.eapp.server.services.user.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@CrossOrigin(origins = ControllerBasics.CROSS_ORIGIN)
public class LtiMoodleController extends ControllerBasics {

    private final static String TOKEN_PARA = "?token=";
    private final static String LTI_ERR_PARA = "?moodleLtiErr=1";

    private final LtiMoodleComponent ltiMoodleComponent;

    protected LtiMoodleController(UserService userService, LtiMoodleComponent ltiMoodleComponent) {
        super(userService);
        this.ltiMoodleComponent = ltiMoodleComponent;
    }

    @Value("${url.planner}")
    private String urlPlanner;

    @Value("${url.client}")
    private String urlClient;

    @Value("${url.login}")
    private String urlLogin;

    @PostMapping
    @RequestMapping(ApplicationConfig.API_LTI_PLANNER)
    public void ltiPlanner(HttpServletRequest request, HttpServletResponse httpServletResponse) throws IOException {
        String para = "";
        try {
            String token = ltiMoodleComponent.createLoginTokenForPlanner(request);
            para = TOKEN_PARA + token;
        } catch (Exception e) {
            logException(e);
            para = LTI_ERR_PARA;
        }
        httpServletResponse.sendRedirect(urlPlanner + urlLogin + para);
    }

    @PostMapping
    @RequestMapping(ApplicationConfig.API_LTI_CLIENT)
    public void ltiClient(HttpServletRequest request, HttpServletResponse httpServletResponse) throws IOException {
        String para = "";
        try {
            String token = ltiMoodleComponent.createLoginTokenForClient(request);
            para = TOKEN_PARA + token;
        } catch (Exception e) {
            logException(e);
            para = LTI_ERR_PARA;
        }
        httpServletResponse.sendRedirect(urlClient + urlLogin + para);
    }

}
