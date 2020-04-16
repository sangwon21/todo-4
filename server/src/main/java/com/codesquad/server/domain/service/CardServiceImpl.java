package com.codesquad.server.domain.service;

import com.codesquad.server.domain.entity.Card;
import com.codesquad.server.domain.entity.Columns;
import com.codesquad.server.domain.entity.History;
import com.codesquad.server.domain.repository.CardRepository;
import com.codesquad.server.domain.repository.ColumnsRepository;
import com.codesquad.server.domain.repository.HistoryRepository;
import com.codesquad.server.domain.value.Location;
import com.codesquad.server.domain.value.RequestCardDTO;
import com.codesquad.server.domain.value.ResponseCardDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Object> save(RequestCardDTO requestCardDTO, Long columnsId) {
        Columns columns = columnsRepository.findById(columnsId).orElseThrow(() -> new IllegalArgumentException("컬럼이 존재하지 않습니다!"));
        Card card = requestCardDTO.getCard();
        columns.addCard(card);
        columnsRepository.save(columns);

        if (card.getAuthor().equals("iOS")) {
            log.info("##### : {}", card);
            return new ResponseEntity<>(card, HttpStatus.CREATED);
        }

        History history = requestCardDTO.getHistory();
        historyRepository.save(history);

        Long id = card.getId();
        LocalDateTime createdTime = history.getHistoryCreatedTime();

        return new ResponseEntity<>(new ResponseCardDTO(id, createdTime), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Object> update(RequestCardDTO requestCardDTO) {
        Card card = requestCardDTO.getCard();;
        cardRepository.save(card);
        return new ResponseEntity<>(new ResponseCardDTO())
    }

    @Override
    public HttpStatus move(Location location) {
        cardRepository.delete(location.getCard());
        Columns columns = columnsRepository.findById(location.getColumnsIndex()).get();
        log.info("index : {}", location.getAfterMoveCardIndex());
        columns.insertCard(location.getAfterMoveCardIndex(), location.getCard());
        columnsRepository.save(columns);
        return HttpStatus.OK;
    }

    @Override
    public HttpStatus delete(Card card) {
        cardRepository.delete(card);
        return HttpStatus.NO_CONTENT;
    }
}
