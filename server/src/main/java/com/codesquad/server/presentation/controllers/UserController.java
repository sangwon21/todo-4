package com.codesquad.server.presentation.controllers;

import com.codesquad.server.domain.entity.User;
import com.codesquad.server.domain.service.UserService;
import com.codesquad.server.domain.value.SignUpRequestUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public User signUp(@RequestBody SignUpRequestUser requestUser) {
        return userService.signUp(requestUser);
    }

    @PostMapping("/signin")
    public User signIn(@RequestBody User user) {
        User loginUser = userService.signIn(user);
        System.out.println("Login OK!");
        return loginUser;
    }

    @GetMapping("/test")
    public Iterable<User> interceptorTest() {
        return userService.list();
    }
}
