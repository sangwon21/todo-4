package com.codesquad.server.domain.service;

import com.codesquad.server.domain.entity.Card;
import com.codesquad.server.domain.entity.Columns;
import com.codesquad.server.domain.repository.CardRepository;
import com.codesquad.server.domain.repository.ColumnsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {

    private final ColumnsRepository columnsRepository;

    private final CardRepository cardRepository;

    @Override
    public HttpStatus save(Card card, Long columnsId) {
        Columns columns = columnsRepository.findById(columnsId).orElseThrow(() -> new IllegalArgumentException("컬럼이 존재하지 않습니다!"));
        columns.addCard(card);
        columnsRepository.save(columns);
        return HttpStatus.CREATED;
    }

    @Override
    public HttpStatus update(Card card) {
        cardRepository.save(card);
        return HttpStatus.NO_CONTENT;
    }

    @Override
    public HttpStatus delete(Card card) {
        cardRepository.delete(card);
        return HttpStatus.NO_CONTENT;
    }
}
