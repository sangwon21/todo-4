package com.codesquad.server.presentation.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MainController {

//    private final JwtUtil jwtUtil;
//
//    private final BoardRepository boardRepository;
//
//    @PostMapping("/signup")
//    public String signup(@RequestBody SignUpRequestUser signUpRequestUser) {
//        return jwtUtil.createToken();
//    }
//
//    @PostMapping("/test")
//    public String test(@RequestBody @Valid SignUpRequestUser signUpRequestUser) {
//        log.info("user : {}", signUpRequestUser);
//        return "OK";
//    }
//
//    @GetMapping("/list")
//    public Board list() {
//        return boardRepository.findById(1L).get();
//    }
}
