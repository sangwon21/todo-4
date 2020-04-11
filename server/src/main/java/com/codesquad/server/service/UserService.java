package com.codesquad.server.service;

import com.codesquad.server.domain.User;
import com.codesquad.server.repository.UserRepository;
import com.codesquad.server.utils.JwtUtils;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private Logger logger = LoggerFactory.getLogger(UserService.class);

    private final JwtUtils jwtUtils = new JwtUtils();

    @NonNull
    private final UserRepository userRepository;

    public User signUp(User requestUser) {
        verifyDuplicatedUser(requestUser.getUserId());
        requestUser.setToken(jwtUtils.createToken());
        return userRepository.save(requestUser);
    }

    private void verifyDuplicatedUser(String userId) {
        boolean isExists = userRepository.findUserByUserId(userId).isPresent();
        if (isExists) {
            throw new IllegalArgumentException("중복된 유저입니다!");
        }
    }

    private User findUserByUserId(String userId) {
        return userRepository.findUserByUserId(userId).orElseThrow(() -> new IllegalArgumentException("없는 유저입니다!"));
    }

    public User siginIn(User requestUser) {
        User user = findUserByUserId(requestUser.getUserId());

        if (!user.getPassword().equals(requestUser.getPassword())) {
            throw new IllegalArgumentException("암호가 일치하지 않습니다.");
        }

        return user;
    }
}
