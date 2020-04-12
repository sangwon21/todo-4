package com.codesquad.server.infrastructure;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.codesquad.server.domain.service.JwtService;
import org.springframework.stereotype.Component;

@Component
public class JwtServiceImpl implements JwtService {
    private String signKey = "TEST";
    private String issuer = "todo-4.com";

    public String createToken() {
        return JWT.create()
                .withIssuer(issuer)
                .withClaim("userId", "EVER")
                .withClaim("password", "pass1234")
                .sign(Algorithm.HMAC256(signKey));
    }

    public void verifyToken(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(signKey))
                .withIssuer(issuer)
                .withClaim("userId", "EVER")
                .withClaim("password", "pass1234")
                .build();

        verifier.verify(token);
    }
}
