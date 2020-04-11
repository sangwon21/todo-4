package com.codesquad.server.presentation.controllers;

import com.codesquad.server.domain.user.User;
import com.codesquad.server.application.user.UserServiceImpl;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    @NonNull
    private final UserServiceImpl userServiceImpl;

    @PostMapping("/signup")
    public User signUp(@RequestBody User user) {
        return userServiceImpl.signUp(user);
    }

    @PostMapping("/signin")
    public User signIn(@RequestBody User user) {
        User loginUser = userServiceImpl.signIn(user);
        System.out.println("Login OK!");
        return loginUser;
    }
}
