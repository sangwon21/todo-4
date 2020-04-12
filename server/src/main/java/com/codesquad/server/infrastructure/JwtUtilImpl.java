package com.codesquad.server.infrastructure;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.codesquad.server.domain.service.JwtUtil;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class JwtUtilImpl implements JwtUtil {
    private String signKey = "TEST";
    private String issuer = "todo-4.com";

    public String createToken() {
        return JWT.create()
                .withIssuer(issuer)
                .withSubject("EVER")
                .withClaim("password", "pass1234")
                .sign(Algorithm.HMAC256(signKey));
    }

    public void verifyToken(String token) {
        System.out.println("come here!!");
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(signKey))
                .withIssuer(issuer)
                .withSubject("EVER")
                .withClaim("password", "pass1234")
                .build();

        verifier.verify(token);
    }

    public Map<String, Claim> getAllCaimsFromToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(signKey);
        DecodedJWT jwtToken = JWT.require(algorithm).build().verify(token);
        return jwtToken.getClaims();
    }
}
