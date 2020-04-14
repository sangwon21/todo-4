package com.codesquad.server.presentation.controllers;

import com.codesquad.server.domain.entity.Columns;
import com.codesquad.server.domain.repository.ColumnsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/columns")
public class ColumnsController {

    private final ColumnsRepository columnsRepository;

    @PostMapping("")
    public HttpStatus create(@RequestBody @Valid Columns columns) {
        columnsRepository.save(columns);
        return HttpStatus.CREATED;
    }

    @PutMapping("")
    public HttpStatus update(@RequestBody @Valid Columns columns) {
//        columnsRepository.update(columns);
        return HttpStatus.NO_CONTENT;
    }

    @DeleteMapping("")
    public HttpStatus delete(@RequestBody @Valid Columns columns) {
        columnsRepository.delete(columns);
        return HttpStatus.NO_CONTENT;
    }
}
