package com.codesquad.server.domain.value;

import com.codesquad.server.domain.entity.Card;
import com.codesquad.server.domain.entity.History;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestCardDTO {
    private Card card;
    private History history;

//    private Long id;
//    private String title;
//    private String note;
//    private String author;
}
