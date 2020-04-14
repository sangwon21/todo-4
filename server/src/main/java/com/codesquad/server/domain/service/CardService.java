package com.codesquad.server.domain.service;

import com.codesquad.server.domain.entity.Card;
import org.springframework.http.HttpStatus;

import java.util.List;

public interface CardService {
    public HttpStatus save(Card card);

    public List<Card> findAllById(Long id);

    public HttpStatus update(Card card);

    public HttpStatus delete(Card card);

}
