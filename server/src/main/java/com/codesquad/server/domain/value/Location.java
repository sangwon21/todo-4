package com.codesquad.server.domain.value;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Location {
    Long cardId;
    Long columnId;
    int afterMoveCardIndex;
}
