package com.codesquad.server.domain.entity;

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

    private String author;

    private String title;

    private String note;
}
