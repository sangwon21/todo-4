package com.codesquad.server.domain.service;

import com.codesquad.server.domain.entity.Board;
import com.codesquad.server.domain.entity.Columns;
import com.codesquad.server.domain.repository.BoardRepository;
import com.codesquad.server.domain.repository.ColumnsRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColumnsServiceImpl implements ColumnsService {

    private final BoardRepository boardRepository;

    private final ColumnsRepository columnsRepository;

    private final Board board;

    public ColumnsServiceImpl(BoardRepository boardRepository, ColumnsRepository columnsRepository) {
        this.boardRepository = boardRepository;
        this.columnsRepository = columnsRepository;
        this.board = boardRepository.findById(1L).get();
    }

    @Override
    public Iterable<Columns> list() {
        return columnsRepository.findAll();
    }

    @Override
    public HttpStatus save(Columns columns) {
        board.addColumn(columns);
        boardRepository.save(board);
        return HttpStatus.CREATED;
    }

    @Override
    public HttpStatus update(Columns columns) {
        columnsRepository.save(columns);
        return HttpStatus.NO_CONTENT;
    }

    @Override
    public HttpStatus delete(Columns columns) {
        columnsRepository.delete(columns);
        return HttpStatus.NO_CONTENT;
    }
}
