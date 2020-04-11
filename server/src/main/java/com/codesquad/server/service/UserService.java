package com.codesquad.server.service;

import com.codesquad.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private UserRepository userRepository;

    public void signUp(SignUpRequest signUpRequest) {
        

    }
}
