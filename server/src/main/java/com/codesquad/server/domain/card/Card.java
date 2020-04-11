package com.codesquad.server.domain.card;

import lombok.*;
import org.springframework.data.annotation.Id;

@Getter
@Setter
@NoArgsConstructor
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
