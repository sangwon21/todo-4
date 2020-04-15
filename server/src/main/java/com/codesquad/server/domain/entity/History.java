package com.codesquad.server.domain.entity;

import lombok.*;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
}
