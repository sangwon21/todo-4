package com.codesquad.server.domain.value;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class Location {
    Long cardId;
    Long columnId;
    int afterMoveCardIndex;
}
