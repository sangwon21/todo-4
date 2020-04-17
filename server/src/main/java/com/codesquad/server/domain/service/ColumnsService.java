package com.codesquad.server.domain.service;

import com.codesquad.server.domain.value.RequestColumnsDTO;
import com.codesquad.server.domain.value.ResponseColumnsAndHistoriesDTO;

import java.time.LocalDateTime;

public interface ColumnsService {
    ResponseColumnsAndHistoriesDTO list();

    LocalDateTime update(RequestColumnsDTO requestColumnsDTO);
}
