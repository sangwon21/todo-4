package com.codesquad.server.common.interceptor;

import com.codesquad.server.domain.service.JwtUtil;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthInterceptor implements HandlerInterceptor {

    @NonNull
    private final JwtUtil jwtUtil;

    @Value("${jwt.token)")
    private String token;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info("request URL : {}", request.getRequestURI());
        log.info("토큰 검증 시작!!");
        String requestUserToken = request.getHeader("token");
        verifyToken(token, requestUserToken);
        return true;
    }

    private void verifyToken(String token, String requestUserToken) {
        if (!token.equals(requestUserToken)) {
            throw new IllegalArgumentException("잘못된 토큰 입니다!");
        }
        jwtUtil.verifyToken(requestUserToken);
        log.info("토큰 검증이 성공하였습니다!!");
    }
}
