package com.codesquad.server.domain.value;

import com.codesquad.server.domain.entity.Columns;
import com.codesquad.server.domain.entity.History;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseColumnsAndHistoriesDTO {
    private final Iterable<Columns> columns;
    private final Iterable<History> history;
}
