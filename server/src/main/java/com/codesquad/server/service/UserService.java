package com.codesquad.server.service;

import com.codesquad.server.domain.User;
import com.codesquad.server.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class UserService {

    private Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    public User signUp(User requestUser) {
        logger.debug("requestUser : {}", requestUser);
        verifyDuplicatedUser(requestUser.getUserId());
        return userRepository.save(requestUser);
    }

    private void verifyDuplicatedUser(String userId) {
        if (userRepository.findUserByUserId(userId).isPresent()) {
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
