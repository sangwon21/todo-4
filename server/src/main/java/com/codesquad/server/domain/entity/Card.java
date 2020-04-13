package com.codesquad.server.domain.entity;

import lombok.*;
import org.springframework.data.annotation.Id;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class Card {

    @Id
    private Long id;
    private String note;

    public Card(String note) {
        this.note = note;
    }
}
