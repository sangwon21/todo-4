package com.codesquad.server.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class Columns {

    @Id
    private Long id;

    private String title;

    private List<Card> cards;

    public void addCard(Card card) {
        this.cards.add(card);
    }

    public void insertCard(int index, Card card) {
        this.cards.add(index, card);
    }
}
