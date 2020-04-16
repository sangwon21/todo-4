package com.codesquad.server.domain.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class Card {

    @Id
    private Long id;

    @NotBlank
    private String note;

    @NotBlank
    private String title;

    @NotBlank
    private String author;


    public Card(Long id, @NotBlank String title, @NotBlank String note, @NotBlank String author) {
        this.id = id;
        this.note = note;
        this.title = title;
        this.author = author;
    }
}
