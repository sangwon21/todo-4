package com.codesquad.server.presentation.controllers;

import com.codesquad.server.domain.service.JwtUtil;
import com.codesquad.server.domain.value.SignUpRequestUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MainController {

    private final JwtUtil jwtUtil;

    @PostMapping("/signup")
    public String signup(@RequestBody SignUpRequestUser signUpRequestUser) {
        return jwtUtil.createToken();
    }

    @PostMapping("/test")
    public String test(@RequestBody @Valid SignUpRequestUser signUpRequestUser) {
        log.info("user : {}", signUpRequestUser);
        return "OK";
    }
}
