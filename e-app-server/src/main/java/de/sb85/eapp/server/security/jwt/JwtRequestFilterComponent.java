package de.sb85.eapp.server.security.jwt;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.services.user.UserService;
import de.sb85.eapp.server.services.user.data.User;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFilterComponent extends OncePerRequestFilter {

    private final static String HEADER_AUTH = "Authorization";
    private final static String HEADER_BEARER = "Bearer ";

    private final static String ERR_TOKEN_EXPIRED = "JWT Token has expired";
    private final static String ERR_TOKEN_UNABLE = "Unable to get JWT Token";
    private final static String ERR_NOT_BEARER = "JWT Token does not begin with Bearer String";
    private final static String ERR_USER_NOT_FOUND = "User from Token not found";
    private final static String ERR_USER_DISABLED = "User ist disabled";

    private final UserService userService;
    private final JwtTokenComponent jwtTokenComponent;

    public JwtRequestFilterComponent(UserService userService, JwtTokenComponent jwtTokenComponent) {
        this.userService = userService;
        this.jwtTokenComponent = jwtTokenComponent;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        try {
            String jwtToken = extractToken(request);
            User user = getUser(extractUsername(jwtToken));
            if ((SecurityContextHolder.getContext().getAuthentication() == null) &&
                    jwtTokenComponent.validateToken(jwtToken, user)) {
                checkUser(user);
                authenticate(request, user);
            }
        } catch (Exception e) {
            if (!request.getRequestURI().startsWith(ApplicationConfig.DEMO_CLIENT_APP) &&
                    !request.getRequestURI().startsWith(ApplicationConfig.DEMO_PLANNER_APP)) {
                logger.info(createLogPrefix(request) + e.getMessage());
            }
        }
        chain.doFilter(request, response);
    }

    private void checkUser(User user) throws Exception {
        if (!user.isEnabled()) {
            throw new Exception(ERR_USER_DISABLED);
        }
    }

    private String createLogPrefix(HttpServletRequest request) {
        return request.getRemoteHost() + " -> " + request.getMethod() + ":" + request.getRequestURI() + ": ";
    }

    private void authenticate(HttpServletRequest request, User user) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        logger.info(createLogPrefix(request) + user.getUsername() + " (" + user.getId() + ")");
        userService.contact(user);
    }

    private String extractToken(HttpServletRequest request) throws Exception {
        final String requestTokenHeader = request.getHeader(HEADER_AUTH);
        if (requestTokenHeader != null && requestTokenHeader.startsWith(HEADER_BEARER)) {
            return requestTokenHeader.substring(HEADER_BEARER.length());
        }
        throw new Exception(ERR_NOT_BEARER);
    }

    private String extractUsername(String jwtToken) throws Exception {
        try {
            return jwtTokenComponent.getUsernameFromToken(jwtToken);
        } catch (IllegalArgumentException e) {
            throw new Exception(ERR_TOKEN_UNABLE);
        } catch (ExpiredJwtException e) {
            throw new Exception(ERR_TOKEN_EXPIRED);
        }
    }

    private User getUser(String username) throws Exception {
        try {
            return this.userService.loadUserByUsername(username);
        } catch (UsernameNotFoundException e) {
            throw new Exception(ERR_USER_NOT_FOUND);
        }
    }

}
