package de.sb85.eapp.server.security.jwt;

import de.sb85.eapp.server.security.jwt.data.JwtSignKey;
import org.springframework.data.repository.CrudRepository;

public interface JwtSignKeyRepository extends CrudRepository<JwtSignKey, Integer> {


}
