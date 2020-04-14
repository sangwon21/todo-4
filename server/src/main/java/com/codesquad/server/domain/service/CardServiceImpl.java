package com.codesquad.server.domain.service;

import com.codesquad.server.domain.entity.Card;
import com.codesquad.server.domain.repository.CardRepository;
import com.codesquad.server.domain.repository.ColumnsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {

    private final ColumnsRepository columnsRepository;

    private final CardRepository cardRepository;

    @Override
    public HttpStatus save(Card card) {
        cardRepository.save(card);
        return HttpStatus.CREATED;
    }

    @Override
    public List<Card> findAllById(Long id) {
        return columnsRepository.findAllByColumnsId(id);
    }

    @Override
    public HttpStatus update(Card card) {
        cardRepository.update(card);
        return HttpStatus.NO_CONTENT;
    }

    @Override
    public HttpStatus delete(Card card) {
        cardRepository.delete(card);
        return HttpStatus.NO_CONTENT;
    }
}
