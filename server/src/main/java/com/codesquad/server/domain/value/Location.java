package com.codesquad.server.domain.value;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Location {
    private Long cardId;
    private Long columnId;
    private int afterMoveCardIndex;
}
