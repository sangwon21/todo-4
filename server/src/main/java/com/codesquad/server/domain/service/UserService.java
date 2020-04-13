package com.codesquad.server.domain.service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    @NonNull
    private JwtUtil jwtUtil;

//    public User signUp(SignUpRequestUser requestUser) {
//        verifyDuplicatedUser(requestUser);
//        User newUser = new User(requestUser, jwtUtil.createToken());
//        return userRepository.save(newUser);
//    }

//    public User signIn(User requestUser) {
//        User user = userRepository.findUserByUserId(requestUser.getUserId()).orElseThrow(() -> new IllegalArgumentException("없는 유저입니다!"));
//
//        if (!user.getPassword().equals(requestUser.getPassword())) {
//            throw new IllegalArgumentException("암호가 일치하지 않습니다.");
//        }
//
//        return user;
//    }
//
//    public Iterable<User> list() {
//        return userRepository.findAll();
//    }
//
//    private void verifyDuplicatedUser(SignUpRequestUser requestUser) {
//        boolean isExists = userRepository.findUserByUserId(requestUser.getUserId()).isPresent();
//        if (isExists) {
//            throw new IllegalArgumentException("중복된 유저입니다!");
//        }
//    }
}
