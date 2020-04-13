package com.codesquad.server.domain.service;

public interface JwtUtil {
    public String createToken();

    public void verifyToken(String token);
}
