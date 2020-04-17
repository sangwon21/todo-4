package com.codesquad.server.domain.service;

import com.codesquad.server.domain.entity.Columns;
import com.codesquad.server.domain.entity.History;
import com.codesquad.server.domain.repository.ColumnsRepository;
import com.codesquad.server.domain.repository.HistoryRepository;
import com.codesquad.server.domain.value.RequestColumnsDTO;
import com.codesquad.server.domain.value.ResponseColumnsAndHistoriesDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class ColumnsServiceImpl implements ColumnsService {

    private final ColumnsRepository columnsRepository;

    private final HistoryRepository historyRepository;

    public ColumnsServiceImpl(ColumnsRepository columnsRepository, HistoryRepository historyRepository) {
        this.columnsRepository = columnsRepository;
        this.historyRepository = historyRepository;
    }

    @Override
    public ResponseColumnsAndHistoriesDTO list() {
        return new ResponseColumnsAndHistoriesDTO(columnsRepository.findAll(), historyRepository.findAll());
    }

    @Transactional
    @Override
    public LocalDateTime update(RequestColumnsDTO requestColumnsDTO) {
        Columns columns = columnsRepository.findById(requestColumnsDTO.getColumns().getId()).orElseThrow(() -> new IllegalArgumentException("칼럼이 존재하지 않습니다!"));
        requestColumnsDTO.getColumns().setCards(columns.getCards());
        columnsRepository.save(requestColumnsDTO.getColumns());

        History history = requestColumnsDTO.getHistory();
        history.setHistoryCreatedTime();
        historyRepository.save(history);

        return history.getHistoryCreatedTime();
    }
}
