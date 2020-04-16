package com.codesquad.server.domain.service;

import com.codesquad.server.domain.entity.Card;
import com.codesquad.server.domain.entity.Columns;
import com.codesquad.server.domain.repository.CardRepository;
import com.codesquad.server.domain.repository.ColumnsRepository;
import com.codesquad.server.domain.repository.HistoryRepository;
import com.codesquad.server.domain.value.Location;
import com.codesquad.server.domain.value.RequestCardDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {

    private final ColumnsRepository columnsRepository;

    private final CardRepository cardRepository;

    private final HistoryRepository historyRepository;

    @Override
    public HttpStatus save(RequestCardDTO requestCardDTO, Long columnsId) {
        Columns columns = columnsRepository.findById(columnsId).orElseThrow(() -> new IllegalArgumentException("컬럼이 존재하지 않습니다!"));
        columns.addCard(requestCardDTO.getCard());
        historyRepository.save(requestCardDTO.getHistory());
        columnsRepository.save(columns);
        return HttpStatus.CREATED;
    }

    @Override
    public HttpStatus update(RequestCardDTO card) {
//        Card updatedCard = new Card(card.getId(), card.getTitle(), card.getNote());
//        cardRepository.save(updatedCard);
        return HttpStatus.NO_CONTENT;
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
