package com.codesquad.server.domain.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;

import javax.validation.constraints.NotBlank;
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

    @NotBlank
    private String title;

    @CreatedDate
    @Column("created_time")
    private LocalDateTime createdTime;

    private List<Card> cards = new ArrayList<>();

    public Columns(@NotBlank String title) {
        this.id = null;
        this.title = title;
        this.createdTime = LocalDateTime.now();
        this.cards = null;
    }

    public void addCard(Long id, String note, LocalDateTime createdTime) {
        cards.add(new Card(id, note, createdTime));
    }
}
