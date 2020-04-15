package com.codesquad.server.domain.entity;

import lombok.*;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class History {

    @Id
    private Long id;

    @NotBlank
    private String nickname;

    @NotBlank
    private String action;

    @NotBlank
    private String actingColumn;

    @NotBlank
    private String movedColumn;

    private LocalDateTime changedTime;

    @NotBlank
    private String contents;

    public History(Long id, @NotBlank String nickname, @NotBlank String action, @NotBlank String actingColumn, @NotBlank String movedColumn, LocalDateTime changedTime, @NotBlank String contents) {
        this.id = id;
        this.nickname = nickname;
        this.action = action;
        this.actingColumn = actingColumn;
        this.movedColumn = movedColumn;
        this.changedTime = LocalDateTime.now();
        this.contents = contents;
    }
}
