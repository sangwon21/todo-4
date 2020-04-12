package com.codesquad.server.domain.service;

import com.codesquad.server.domain.entity.User;

public interface UserService {
    public User signUp(User user);

    public User signIn(User user);
}
