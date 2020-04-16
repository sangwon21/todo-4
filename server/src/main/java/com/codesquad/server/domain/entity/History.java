package com.codesquad.server.domain.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@Setter
public class History {

    @Id
    private Long id;

    @NotBlank
    private String contents;

    private LocalDateTime historyCreatedTime;

    public History(Long id, String contents, LocalDateTime historyCreatedTime) {
        this.id = id;
        this.contents = contents;
        this.historyCreatedTime = LocalDateTime.now();
    }
}
