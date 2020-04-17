package com.codesquad.server.domain.entity;

import lombok.*;
import org.springframework.data.annotation.Id;

@Getter
@Setter
@AllArgsConstructor
public class Card {

    @Id
    private Long id;

    private String author;

    private String title;

    private String note;
}
