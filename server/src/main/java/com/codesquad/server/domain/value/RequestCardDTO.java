package com.codesquad.server.domain.value;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestCardDTO {

    private Long id;
    private String title;
    private String note;
    private String author;
}
