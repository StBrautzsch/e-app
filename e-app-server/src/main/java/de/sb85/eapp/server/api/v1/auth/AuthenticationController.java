package de.sb85.eapp.server.api.v1.auth;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.api.ControllerBasics;
import de.sb85.eapp.server.security.jwt.JwtTokenComponent;
import de.sb85.eapp.server.services.user.UserService;
import de.sb85.eapp.server.services.user.data.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Date;


@RestController
@CrossOrigin(origins = ControllerBasics.CROSS_ORIGIN)
public class AuthenticationController extends ControllerBasics {

    public final static String ERR_USER_DISABLED = "ERR_USER_DISABLED";
    public final static String ERR_INVALID_CREDENTIALS = "ERR_INVALID_CREDENTIALS";

    private final AuthenticationManager authenticationManager;
    private final JwtTokenComponent jwtTokenComponent;
    private final UserService userService;

    public AuthenticationController(AuthenticationManager authenticationManager, JwtTokenComponent jwtTokenComponent,
                                    UserService userDetailsService) {
        super(userDetailsService);
        this.authenticationManager = authenticationManager;
        this.jwtTokenComponent = jwtTokenComponent;
        this.userService = userDetailsService;
    }

    @PostMapping(ApplicationConfig.API_V1_AUTH)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        final User user = userService.loadUserByUsername(authenticationRequest.getUsername());
        final Date expiration = jwtTokenComponent.calcDefaultExpiration();
        final String token = jwtTokenComponent.generateToken(user, expiration);
        return ResponseEntity.ok(new JwtResponse(token, expiration));
    }

    @PostMapping(ApplicationConfig.API_V1_AUTH_RENEW)
    public ResponseEntity<?> renew(Principal principal) {
        final User user = userService.loadUserByUsername(principal.getName());
        final Date expiration = jwtTokenComponent.calcDefaultExpiration();
        final String token = jwtTokenComponent.generateToken(user, expiration);
        return ResponseEntity.ok(new JwtResponse(token, expiration));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception(ERR_USER_DISABLED, e);
        } catch (BadCredentialsException e) {
            throw new Exception(ERR_INVALID_CREDENTIALS, e);
        }
    }

}
