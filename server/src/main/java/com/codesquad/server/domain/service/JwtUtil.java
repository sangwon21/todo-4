package com.codesquad.server.domain.service;

public interface JwtUtil {
    String createToken();

    void verifyToken(String token);
}
