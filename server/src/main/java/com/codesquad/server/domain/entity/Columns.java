package com.codesquad.server.domain.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
public class Columns {

    @Id
    private Long id;

    @NotBlank
    private String title;

    private LocalDateTime createdTime;

    private List<Card> cards;

    public Columns(Long id, @NotBlank String title, LocalDateTime createdTime, List<Card> cards) {
        this.id = id;
        this.title = title;
        this.createdTime = LocalDateTime.now();
        this.cards = cards;
    }

    public void addCard(Card card) {
        this.cards.add(card);
    }

    public void insertCard(int index, Card card) {
        this.cards.add(index, card);
    }
}
