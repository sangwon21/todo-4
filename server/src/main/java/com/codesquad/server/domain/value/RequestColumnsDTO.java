package com.codesquad.server.domain.value;

import com.codesquad.server.domain.entity.Columns;
import com.codesquad.server.domain.entity.History;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestColumnsDTO {
    private Columns columns;
    private History history;
}
