package com.codesquad.server.web;

import com.codesquad.server.domain.User;
import com.codesquad.server.service.UserService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    @NonNull
    private final UserService userService;

    @PostMapping("/signup")
    public User signUp(@RequestBody User user) {
        return userService.signUp(user);
    }

    @PostMapping("/signin")
    public User signIn(@RequestBody User user) {
        User loginUser = userService.signIn(user);
        System.out.println("Login OK!");
        return loginUser;
    }
}
