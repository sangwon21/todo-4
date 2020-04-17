package com.codesquad.server.common.config;

import com.codesquad.server.common.interceptor.JwtAuthInterceptor;
import io.swagger.models.HttpMethod;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@CrossOrigin("*")
public class WebConfig implements WebMvcConfigurer {

    @NonNull
    private final JwtAuthInterceptor jwtAuthInterceptor;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods(
                        HttpMethod.GET.name(),
                        HttpMethod.HEAD.name(),
                        HttpMethod.POST.name(),
                        HttpMethod.PUT.name(),
                        HttpMethod.DELETE.name()
                );
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        List<String> swaggerPathPatterns = new ArrayList<>();

        swaggerPathPatterns.add("/");
        swaggerPathPatterns.add("/swagger-ui.html");
        swaggerPathPatterns.add("/swagger-resources/**");
        swaggerPathPatterns.add("/error");
        swaggerPathPatterns.add("/webjars/**");
        swaggerPathPatterns.add("/csrf");

        registry.addInterceptor(jwtAuthInterceptor)
                .addPathPatterns("/*")
                .excludePathPatterns("/signup")
                .excludePathPatterns("/signin")
                .excludePathPatterns(swaggerPathPatterns);
    }
}
