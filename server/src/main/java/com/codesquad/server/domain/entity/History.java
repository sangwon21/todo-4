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

    private String userAction;
    
    private String contents;

    private String suffix;

    private LocalDateTime historyCreatedTime;

    public History(Long id, String userAction, @NotBlank String contents, String suffix, LocalDateTime historyCreatedTime) {
        this.id = id;
        this.userAction = userAction;
        this.contents = contents;
        this.suffix = suffix;
        this.historyCreatedTime = LocalDateTime.now();
    }
}
