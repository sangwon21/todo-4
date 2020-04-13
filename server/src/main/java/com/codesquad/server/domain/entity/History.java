package com.codesquad.server.domain.entity;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public class History {

    @Id
    private Long id;
    private String action;
    private LocalDateTime changedTime;

    public History (String action) {
        this.action = action;
    }
}
