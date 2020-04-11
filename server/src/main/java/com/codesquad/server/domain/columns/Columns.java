package com.codesquad.server.domain.columns;

import com.codesquad.server.domain.card.Card;
import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Columns {

    @Id
    private Long id;
    private String name;

    private List<Card> cards = new ArrayList<>();

    public Columns(String name) {
        this.name = name;
    }

    public void addCard(String note) {
        cards.add(new Card(note));
    }
}
