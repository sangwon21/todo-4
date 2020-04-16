package com.codesquad.server.domain.service;

import com.codesquad.server.domain.entity.Board;
import com.codesquad.server.domain.entity.Columns;
import com.codesquad.server.domain.entity.History;
import com.codesquad.server.domain.repository.BoardRepository;
import com.codesquad.server.domain.repository.ColumnsRepository;
import com.codesquad.server.domain.repository.HistoryRepository;
import com.codesquad.server.domain.value.RequestColumnsDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ColumnsServiceImpl implements ColumnsService {

    private final BoardRepository boardRepository;

    private final ColumnsRepository columnsRepository;

    private final HistoryRepository historyRepository;

    private final Board board;

    public ColumnsServiceImpl(BoardRepository boardRepository, ColumnsRepository columnsRepository, HistoryRepository historyRepository) {
        this.boardRepository = boardRepository;
        this.columnsRepository = columnsRepository;
        this.historyRepository = historyRepository;
        this.board = boardRepository.findById(1L).get();
    }

    @Override
    public Iterable<Columns> list() {
        return columnsRepository.findAll();
    }

    @Override
    public LocalDateTime update(RequestColumnsDTO requestColumnsDTO) {
        Columns columns = columnsRepository.findById(requestColumnsDTO.getColumns().getId()).orElseThrow(() -> new IllegalArgumentException("칼럼이 존재하지 않습니다!"));
        requestColumnsDTO.getColumns().setCards(columns.getCards());
        columnsRepository.save(requestColumnsDTO.getColumns());

        History history = requestColumnsDTO.getHistory();
        historyRepository.save(history);

        return history.getHistoryCreatedTime();
    }
}
