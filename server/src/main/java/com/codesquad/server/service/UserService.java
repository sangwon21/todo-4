package com.codesquad.server.service;

import com.codesquad.server.domain.User;
import com.codesquad.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private UserRepository userRepository;

    public User signUp(User requestUser) {
        verifyDuplicatedUser(requestUser.getUserId());
        return userRepository.save(requestUser);
    }

    private void verifyDuplicatedUser(String userId) {
        userRepository.findUserByUserId(userId).orElseThrow(() -> new IllegalArgumentException("중북된 유저입니다!"));
    }

    private User findUserByUserId(String userId) {
        return userRepository.findUserByUserId(userId).orElseThrow(() -> new IllegalArgumentException("없는 유저입니다!"));
    }

    public User siginIn(User requestUser) {
        User user = findUserByUserId(requestUser.getUserId());

        if(!user.getPassword().equals(requestUser.getPassword())) {
            throw new IllegalArgumentException("암호가 일치하지 않습니다.");
        }

        return user;
    }
}
