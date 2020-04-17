package com.codesquad.server.presentation.controllers;

import com.codesquad.server.domain.service.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class MainController {

    private final JwtUtil jwtUtil;

    @GetMapping("/")
    public String test() {
        return jwtUtil.createToken();
    }
}
