package de.sb85.eapp.server.api.v1.auth;

import java.util.Date;

public class JwtResponse {

    private final String token;
    private final Date expiration;

    public JwtResponse(String token, Date expiration) {
        this.token = token;
        this.expiration = expiration;
    }

    public String getToken() {
        return this.token;
    }

    public String getExpiration() {
        return expiration.toInstant().toString();
    }

}
