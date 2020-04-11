package com.codesquad.server.config;

import com.codesquad.server.domain.User;
import com.codesquad.server.repository.UserRepository;
import com.codesquad.server.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class JwtInterceptor implements HandlerInterceptor {

    @Autowired
    private UserRepository userRepository;

    private JwtUtils jwtUtils = new JwtUtils();

    private String headerTokenKey = "token";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        User user = userRepository.findUserByUserId(request.getHeader("userId"))
                .orElseThrow(() -> new IllegalArgumentException("없는 유저입니다."));
        String token = request.getHeader(headerTokenKey);
        verifyToken(token, user.getToken());
        return true;
    }

    private void verifyToken(String token, String userToken) {
        if (!token.equals(userToken)) {
            throw new IllegalArgumentException("사용자의 Token과 일치하지 않습니다!");
        }
        jwtUtils.verifyToken(token);
    }
}
