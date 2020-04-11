package com.codesquad.server.application.user;

import com.codesquad.server.application.jwt.JwtUtil;
import com.codesquad.server.domain.user.User;
import com.codesquad.server.domain.user.UserRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    @NonNull
    private final JwtUtil jwtUtil;

    @NonNull
    private final UserRepository userRepository;

    private Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    public User signUp(User requestUser) {
        verifyDuplicatedUser(requestUser.getUserId());
        requestUser.setToken(jwtUtil.createToken());
        return userRepository.save(requestUser);
    }

    @Override
    public User signIn(User requestUser) {
        User user = findUserByUserId(requestUser.getUserId());

        if (!user.getPassword().equals(requestUser.getPassword())) {
            throw new IllegalArgumentException("암호가 일치하지 않습니다.");
        }

        return user;
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
}
