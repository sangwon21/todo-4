package com.codesquad.server.domain.service;

import com.codesquad.server.domain.entity.Columns;
import org.springframework.http.HttpStatus;

public interface ColumnsService {
    public HttpStatus save(Columns columns);
    public HttpStatus update(Columns columns);
    public HttpStatus delete(Columns columns);
}
