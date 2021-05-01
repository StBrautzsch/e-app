package de.sb85.eapp.server.security.jwt.data;

import de.sb85.eapp.server.services.DataBasics;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.persistence.Entity;

@Entity
public class JwtSignKey extends DataBasics {

    private java.security.Key key;

    public JwtSignKey() {
        key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    }

    public java.security.Key getKey() {
        return key;
    }

}
