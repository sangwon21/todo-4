package com.codesquad.server.domain.value;

import com.codesquad.server.domain.entity.Card;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class Location {
    Card card;
    Long columnsIndex;
    int afterMoveCardIndex;
}
