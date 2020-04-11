package com.codesquad.server.application.jwt;

public interface JwtService {
    public String createToken();

    public void verifyToken(String token);
}
