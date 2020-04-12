package com.codesquad.server.domain.service;

import com.codesquad.server.domain.entity.User;
import com.codesquad.server.domain.repository.UserRepository;
import com.codesquad.server.domain.value.SignUpRequestUser;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    @NonNull
    private final JwtService jwtService;

    @NonNull
    private final UserRepository userRepository;

    private Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    public User signUp(SignUpRequestUser requestUser) {
        verifyDuplicatedUser(requestUser);
        User newUser = new User(requestUser, jwtService.createToken());
        return userRepository.save(newUser);
    }

    @Override
    public User signIn(User requestUser) {
        User user = userRepository.findUserByUserId(requestUser.getUserId()).orElseThrow(() -> new IllegalArgumentException("없는 유저입니다!"));

        if (!user.getPassword().equals(requestUser.getPassword())) {
            throw new IllegalArgumentException("암호가 일치하지 않습니다.");
        }

        return user;
    }

    private void verifyDuplicatedUser(SignUpRequestUser requestUser) {
        boolean isExists = userRepository.findUserByUserId(requestUser.getUserId()).isPresent();
        if (isExists) {
            throw new IllegalArgumentException("중복된 유저입니다!");
        }
    }
}
