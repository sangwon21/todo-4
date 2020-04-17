package com.codesquad.server.domain.value;

import com.codesquad.server.domain.entity.History;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
public class RequestLocationDTO {
    private Location location;
    private History history;
}
