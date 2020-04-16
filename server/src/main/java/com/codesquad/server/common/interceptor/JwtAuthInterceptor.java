package com.codesquad.server.common.interceptor;

import com.codesquad.server.domain.service.JwtUtil;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthInterceptor implements HandlerInterceptor {

    @NonNull
    private JwtUtil jwtUtil;

    private String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlLXNxdWFkLmNvbSIsInVzZXJJZCI6IkVWRVIifQ.qBB-zuqxeXMxTeqWeDU4esYUv5ew2VCamWNmvZM7kA4";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String requestUserToken = request.getHeader("token");
        verifyToken(token, requestUserToken);
        return true;
    }

    private void verifyToken(String token, String requestUserToken) {
        if (!token.equals(requestUserToken)) {
            throw new IllegalArgumentException("잘못된 토큰 입니다!");
        }
        jwtUtil.verifyToken(requestUserToken);
    }
}
