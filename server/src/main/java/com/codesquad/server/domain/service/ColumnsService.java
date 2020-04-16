package com.codesquad.server.domain.service;

import com.codesquad.server.domain.entity.Columns;
import com.codesquad.server.domain.value.RequestColumnsDTO;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

public interface ColumnsService {
    Iterable<Columns> list();

    LocalDateTime update(RequestColumnsDTO requestColumnsDTO);
}
