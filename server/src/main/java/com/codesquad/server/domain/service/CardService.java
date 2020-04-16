package com.codesquad.server.domain.service;

import com.codesquad.server.domain.entity.Card;
import com.codesquad.server.domain.value.Location;
import com.codesquad.server.domain.value.RequestCardDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public interface CardService {
    public ResponseEntity<Object> save(RequestCardDTO requestCardDTO, Long id);

    public HttpStatus update(RequestCardDTO requestCardDTO);

    public HttpStatus move(Location location);

    public HttpStatus delete(Card card);
}
