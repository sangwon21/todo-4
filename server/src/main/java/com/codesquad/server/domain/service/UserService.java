package com.codesquad.server.domain.service;

import com.codesquad.server.domain.entity.User;
import com.codesquad.server.domain.value.SignUpRequestUser;

public interface UserService {
    public User signUp(SignUpRequestUser user);

    public User signIn(User user);
}
