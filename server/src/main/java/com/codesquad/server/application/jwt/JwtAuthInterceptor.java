package com.codesquad.server.application.jwt;

import com.codesquad.server.domain.user.User;
import com.codesquad.server.domain.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class JwtAuthInterceptor implements HandlerInterceptor {

    private Logger logger = LoggerFactory.getLogger(JwtAuthInterceptor.class);

    @Autowired
    private UserRepository userRepository;

    private JwtServiceImpl jwtUtilImpl = new JwtServiceImpl();

    private String headerTokenKey = "token";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        User user = userRepository.findUserByUserId(request.getHeader("userId"))
                .orElseThrow(() -> new IllegalArgumentException("없는 유저입니다."));
        logger.info("response : {}", response);
        String token = request.getHeader(headerTokenKey);
        logger.info("token : {}", token);
        verifyToken(token, user.getToken());
        return true;
    }

    private void verifyToken(String token, String userToken) {
        if (!token.equals(userToken)) {
            throw new IllegalArgumentException("사용자의 Token과 일치하지 않습니다!");
        }
        jwtUtilImpl.verifyToken(token);
    }
}
