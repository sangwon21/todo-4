package com.codesquad.server.application.user;

import com.codesquad.server.domain.user.User;

public interface UserService {
    public User signUp(User user);
    public User signIn(User user);
}
