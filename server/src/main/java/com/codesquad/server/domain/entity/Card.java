package com.codesquad.server.domain.entity;

import lombok.*;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class Card {

    @Id
    private Long id;

    @NotBlank
    private String note;

    private LocalDateTime createdTime;

    public Card(Long id, @NotBlank String note, LocalDateTime createdTime) {
        this.id = id;
        this.note = note;
        this.createdTime = LocalDateTime.now();
    }
}
