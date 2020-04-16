package com.codesquad.server.domain.value;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ResponseDTO {
    private final Long id;
    private final LocalDateTime historyCreatedTime;
}
