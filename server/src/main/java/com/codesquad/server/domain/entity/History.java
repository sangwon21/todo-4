package com.codesquad.server.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class History {

    @Id
    private Long id;

    private String userAction;

    private String contents;

    private String suffix;

    private LocalDateTime historyCreatedTime;

    public void setHistoryCreatedTime() {
        this.historyCreatedTime = LocalDateTime.now();
    }
}
