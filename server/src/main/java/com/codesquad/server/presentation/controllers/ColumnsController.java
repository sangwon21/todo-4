package com.codesquad.server.presentation.controllers;

import com.codesquad.server.domain.entity.Columns;
import com.codesquad.server.domain.service.ColumnsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/columns")
public class ColumnsController {

    private final ColumnsService columnsService;

    @GetMapping("")
    public Iterable<Columns> list() {
        return columnsService.list();
    }

    @PostMapping("")
    public HttpStatus create(@RequestBody @Valid Columns columns) {
        log.info("columns : {}", columns);
        return columnsService.save(columns);
    }

    @PutMapping("")
    public HttpStatus update(@RequestBody @Valid Columns columns) {
        log.info("columns : {}", columns);
        return columnsService.update(columns);
    }

    @DeleteMapping("")
    public HttpStatus delete(@RequestBody @Valid Columns columns) {
        log.info("columns : {}", columns);
        return columnsService.delete(columns);
    }
}
