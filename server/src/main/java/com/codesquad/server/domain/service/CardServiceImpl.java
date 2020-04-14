package com.codesquad.server.domain.service;

import com.codesquad.server.domain.entity.Card;
import com.codesquad.server.domain.repository.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {

    private final CardRepository cardRepository;

    @Override
    public HttpStatus save(Card card) {
        cardRepository.save(card);
        return HttpStatus.CREATED;
    }

    @Override
    public HttpStatus update(Card updatedCard) {
        Card card = findCardById(updatedCard.getId());
        card.setNote(updatedCard.getNote());
        return save(card);
    }

    @Override
    public HttpStatus delete(Card card) {
        return null;
    }

    private Card findCardById(Long id) {
        return cardRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("카드가 존재하지 않습니다!"));
    }
}
