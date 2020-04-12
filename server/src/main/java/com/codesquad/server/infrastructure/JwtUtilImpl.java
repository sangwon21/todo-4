package com.codesquad.server.infrastructure;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.codesquad.server.domain.service.JwtUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtilImpl implements JwtUtil {

    @Value("${jwt.signKey}")
    private String signKey;

    @Value("${jwt.userId}")
    private String userId;

    @Value("${jwt.password}")
    private String password;

    private String issuer = "code-squad.com";

    public String createToken() {
         return JWT.create()
                .withIssuer(issuer)
                .withSubject(userId)
                .withClaim("password", password)
                .sign(Algorithm.HMAC256(signKey));
    }

    public void verifyToken(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(signKey))
                .withIssuer(issuer)
                .withSubject(userId)
                .withClaim("password", password)
                .build();

        verifier.verify(token);
    }
}
