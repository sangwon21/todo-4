package com.codesquad.server.presentation.controllers;

import com.codesquad.server.domain.entity.User;
import com.codesquad.server.domain.service.UserServiceImpl;
import com.codesquad.server.domain.value.SignUpRequestUser;
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
    public User signUp(@RequestBody SignUpRequestUser requestUser) {
        return userServiceImpl.signUp(requestUser);
    }

    @PostMapping("/signin")
    public User signIn(@RequestBody User user) {
        User loginUser = userServiceImpl.signIn(user);
        System.out.println("Login OK!");
        return loginUser;
    }
}
