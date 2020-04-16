package com.codesquad.server.domain.service;

import com.codesquad.server.domain.entity.Card;
import com.codesquad.server.domain.entity.Columns;
import com.codesquad.server.domain.entity.History;
import com.codesquad.server.domain.repository.CardRepository;
import com.codesquad.server.domain.repository.ColumnsRepository;
import com.codesquad.server.domain.repository.HistoryRepository;
import com.codesquad.server.domain.value.Location;
import com.codesquad.server.domain.value.RequestCardDTO;
import com.codesquad.server.domain.value.RequestLocationDTO;
import com.codesquad.server.domain.value.ResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {

    private final ColumnsRepository columnsRepository;

    private final CardRepository cardRepository;

    private final HistoryRepository historyRepository;

    @Override
    public ResponseDTO save(RequestCardDTO requestCardDTO, Long columnId) {
        Columns columns = columnsRepository.findById(columnId).orElseThrow(() -> new IllegalArgumentException("컬럼이 존재하지 않습니다!"));
        Card card = requestCardDTO.getCard();
        columns.addCard(card);
        columnsRepository.save(columns);

        History history = requestCardDTO.getHistory();
        historyRepository.save(history);

        Long id = card.getId();
        LocalDateTime createdTime = history.getHistoryCreatedTime();

        return new ResponseDTO(id, createdTime);
    }

    @Override
    public LocalDateTime update(RequestCardDTO requestCardDTO) {
        Card card = requestCardDTO.getCard();
        cardRepository.save(card);

        History history = requestCardDTO.getHistory();
        historyRepository.save(history);

        return history.getHistoryCreatedTime();
    }

    @Override
    public LocalDateTime move(RequestLocationDTO requestLocationDTO) {
        Location location = requestLocationDTO.getLocation();
        Card card = cardRepository.findById(location.getCardId()).orElseThrow(() -> new IllegalArgumentException("카드가 존재하지 않습니다!"));
        cardRepository.delete(card);

        Columns columns = columnsRepository.findById(location.getColumnId()).orElseThrow(() -> new IllegalArgumentException("컬럼이 존재하지 않습니다!"));
        columns.insertCard(location.getAfterMoveCardIndex(), card);
        columnsRepository.save(columns);

        History history = requestLocationDTO.getHistory();
        historyRepository.save(history);

        return history.getHistoryCreatedTime();
    }

    @Override
    public LocalDateTime delete(RequestCardDTO requestCardDTO) {
        Card card = cardRepository.findById(requestCardDTO.getCard().getId()).orElseThrow(() -> new IllegalArgumentException("카드가 존재하지 않습니다!"));
        cardRepository.delete(card);

        History history = requestCardDTO.getHistory();
        historyRepository.save(history);
        return history.getHistoryCreatedTime();
    }
}
