package com.codesquad.server.common.config;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.auditing.DateTimeProvider;
import org.springframework.data.jdbc.repository.config.EnableJdbcAuditing;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.Optional;

@EnableJdbcAuditing(dateTimeProviderRef = "dateTimeProvider")
@Configuration
public class SpringDataJdbcConfig {

    // CurrentDateTimeProvider = LocalDateTime.now())
    //함수를 이용하여 작성 시각을 반환하고
    // org.springframework.data.auditing.DateTimeProvider
    //인터페이스를 구현한 오브젝트를 어플리케이션 context에 등록하여,
    // @EnableJdbcAuditing의 dateTimeProviderRef속성에 등록한 오브젝트의 のBeanIDを지정한다

    @Bean
    DateTimeProvider dateTimeProvider(ObjectProvider<Clock> clockObjectProvider) {
        return () -> Optional.of(LocalDateTime.now(clockObjectProvider.getIfAvailable(Clock::systemDefaultZone)));
    }
}
