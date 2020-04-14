package com.codesquad.server.infrastructure;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.codesquad.server.domain.service.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class JwtUtilImpl implements JwtUtil {

    @Value("${jwt.signKey}")
    private String signKey;

    @Value("${jwt.userId}")
    private String userId;

    private String issuer = "code-squad.com";

    public String createToken() {
        log.info("userId : {}", userId);
        log.info("signKey : {}", signKey);

         return JWT.create()
                .withIssuer(issuer)
                 .withClaim("userId", userId)
                .sign(Algorithm.HMAC256(signKey));
    }

    public void verifyToken(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(signKey))
                .withIssuer(issuer)
                .withClaim("userId", userId)
                .build();

        verifier.verify(token);
    }
}
