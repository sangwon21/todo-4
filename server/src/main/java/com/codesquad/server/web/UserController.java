package com.codesquad.server.web;

import com.codesquad.server.domain.User;
import com.codesquad.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private UserService userService;

    @PostMapping("/signup")
    public User signUp(User user) {
        return userService.signUp(user);
    }

    @PostMapping("/signin")
    public User signIn(User user) {
        return userService.siginIn(user);
    }
}
