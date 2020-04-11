package com.codesquad.server.application.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;

public class JwtUtilImpl implements JwtUtil {
    private String signKey = "TEST";
    private String issuer = "EVER";

    public String createToken() {
        return JWT.create()
                .withIssuer(issuer)
                .sign(Algorithm.HMAC256(signKey));
    }

    public void verifyToken(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(signKey))
                .withIssuer(issuer)
                .build();

        verifier.verify(token);
    }
}
