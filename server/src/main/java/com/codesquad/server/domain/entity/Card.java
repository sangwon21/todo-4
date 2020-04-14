package com.codesquad.server.domain.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class Card {

    @Id
    private Long id;

    @NotBlank
    private String note;

    @CreatedDate
    private LocalDateTime createdTime;
}
