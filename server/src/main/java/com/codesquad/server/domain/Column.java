package com.codesquad.server.domain;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Column {

    @Id
    private Long id;
    private String name;

    private List<Card> cards = new ArrayList<>();

    public Column (String name) {
        this.name = name;
    }

    public void addCard(String note) {
        cards.add(new Card(note));
    }
}
