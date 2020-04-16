package com.codesquad.server.domain.service;

import com.codesquad.server.domain.entity.Columns;
import org.springframework.http.HttpStatus;

import java.util.List;

public interface ColumnsService {
    public Iterable<Columns> list();
    public HttpStatus save(Columns columns);
    public HttpStatus update(Columns columns);
    public HttpStatus delete(Columns columns);
}
