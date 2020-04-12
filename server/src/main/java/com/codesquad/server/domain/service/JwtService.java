package com.codesquad.server.domain.service;

public interface JwtService {
    public String createToken();

    public void verifyToken(String token);
}
