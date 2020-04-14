package com.codesquad.server.domain.entity;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class History {

    @Id
    private Long id;
    private String nickname;
    private String action;
    private String actingColumn;
    private String movedColumn;
    private LocalDateTime changedTime;
    private String contents;
}
