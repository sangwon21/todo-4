package com.codesquad.server.domain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
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

    private List<Card> cards = new ArrayList<>();

    public Columns(Long id, @NotBlank String title, LocalDateTime createdTime, List<Card> cards) {
        this.id = id;
        this.title = title;
        this.createdTime = LocalDateTime.now();
        this.cards = cards;
    }

    public void addCard(Card card) {
        cards.add(card);
    }
}
