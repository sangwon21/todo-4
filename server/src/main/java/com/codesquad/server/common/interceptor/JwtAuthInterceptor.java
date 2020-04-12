package com.codesquad.server.common.interceptor;

import com.codesquad.server.domain.entity.User;
import com.codesquad.server.domain.repository.UserRepository;
import com.codesquad.server.domain.service.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class JwtAuthInterceptor implements HandlerInterceptor {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private Logger logger = LoggerFactory.getLogger(JwtAuthInterceptor.class);

    private String headerTokenKey = "token";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        logger.info("userId : {}", request.getHeader("userId"));
        User user = userRepository.findUserByUserId(request.getHeader("userId"))
                .orElseThrow(() -> new IllegalArgumentException("없는 유저입니다."));
        String token = request.getHeader(headerTokenKey);
        logger.info("token : {}", request.getHeader("token"));
        verifyToken(token, user.getToken());
        return true;
    }

    private void verifyToken(String token, String userToken) {
        if (!token.equals(userToken)) {
            throw new IllegalArgumentException("사용자의 Token과 일치하지 않습니다!");
        }
        jwtUtil.verifyToken(token);
    }
}
