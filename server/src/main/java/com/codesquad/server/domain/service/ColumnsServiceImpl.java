package com.codesquad.server.domain.service;

import com.codesquad.server.domain.entity.Columns;
import com.codesquad.server.domain.repository.ColumnsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ColumnsServiceImpl implements ColumnsService {

    private final ColumnsRepository columnsRepository;

    @Override
    public HttpStatus save(Columns columns) {
        columnsRepository.save(columns);
        return HttpStatus.CREATED;
    }

    @Override
    public HttpStatus update(Columns columns) {
        columnsRepository.update(columns.getTitle(), columns.getId());
        return HttpStatus.NO_CONTENT;
    }

    @Override
    public HttpStatus delete(Columns columns) {
        columnsRepository.delete(columns);
        return HttpStatus.NO_CONTENT;
    }
}
