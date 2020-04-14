package com.codesquad.server.domain.entity;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class Columns {

    @Id
    private Long id;
    private String title;
    private LocalDateTime createdTime;

    private List<Card> cards = new ArrayList<>();

    public void addCard(Long id, String note, LocalDateTime createdTime) {
        cards.add(new Card(id, note, createdTime));
    }
}
