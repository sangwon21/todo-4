package com.codesquad.server.application.jwt;

public interface JwtUtil {
    public String createToken();
    public void verifyToken(String token);
}
