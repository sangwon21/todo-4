package com.codesquad.server.domain.service;

import com.codesquad.server.domain.entity.Card;
import org.springframework.http.HttpStatus;

public interface CardService {
    public HttpStatus save(Card card, Long id);

    public HttpStatus update(Card card);

    public HttpStatus delete(Card card);

}
