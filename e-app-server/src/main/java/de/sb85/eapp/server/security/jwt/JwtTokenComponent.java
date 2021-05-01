package de.sb85.eapp.server.security.jwt;

import de.sb85.eapp.server.security.jwt.data.JwtSignKey;
import de.sb85.eapp.server.services.user.data.User;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenComponent {

    @Value("${jwt.validityS1}")
    public long validityS1;

    @Value("${jwt.validityS2}")
    public long validityS2;

    @Value("${jwt.validityS3}")
    public long validityS3;

    @Value("${jwt.validityShortMS}")
    public long validityShortMS;

    private Key key;

    private final JwtSignKeyRepository keyRepository;

    public JwtTokenComponent(JwtSignKeyRepository keyRepository) {
        this.keyRepository = keyRepository;
        keyHandling();
    }

    private void keyHandling() {
        if (keyRepository.count() != 1) {
            keyRepository.deleteAll();
            keyRepository.save(new JwtSignKey());
        }
        key = keyRepository.findAll().iterator().next().getKey();
    }


    public String getUsernameFromToken(String token) throws Exception {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public Date getExpirationDateFromToken(String token) throws Exception {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getExpiration();
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public String getIdFromToken(String token) throws Exception {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getId();
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    private Boolean isTokenExpired(String token) throws Exception {
        return getExpirationDateFromToken(token).before(new Date());
    }

    public String generateToken(User userDetails) {
        return generateToken(userDetails, calcDefaultExpiration());
    }

    public String generateToken(User user, Date expiration) {
        return doGenerateToken(user.getUsername(), user.getTokenKey(), expiration);
    }

    private String doGenerateToken(String subject, String id, Date expiration) {
        return Jwts.builder()
                .setSubject(subject)
                .setId(id)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public Boolean validateToken(String token, User user) throws Exception {
        return (getUsernameFromToken(token).equals(user.getUsername()) &&
                getIdFromToken(token).equals(user.getTokenKey()) &&
                !isTokenExpired(token));
    }

    public Date calcDefaultExpiration() {
        return new Date(System.currentTimeMillis() + 1000 * validityS1 * validityS2 * validityS3);
    }

    public Date calcShortExpiration() {
        return new Date(System.currentTimeMillis() + validityShortMS);
    }

}
