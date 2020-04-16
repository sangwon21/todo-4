package com.codesquad.server.domain.value;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ResponseCardDTO {
    private Long id;
    private LocalDateTime historyCreatedTime;
}
