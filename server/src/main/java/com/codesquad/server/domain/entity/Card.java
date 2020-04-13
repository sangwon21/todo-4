package com.codesquad.server.domain.entity;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class Card {

    @Id
    private Long id;
    private String note;
    private LocalDateTime createdTime;

    public Card(String note, LocalDateTime createdTime) {
        this.note = note;
        this.createdTime = createdTime;
    }
}
