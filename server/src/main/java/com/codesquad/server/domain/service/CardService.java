package com.codesquad.server.domain.service;

import com.codesquad.server.domain.entity.Card;
import com.codesquad.server.domain.value.Location;
import com.codesquad.server.domain.value.RequestCardDTO;
import org.springframework.http.HttpStatus;

public interface CardService {
    public HttpStatus save(RequestCardDTO requestCardDTO, Long id);

    public HttpStatus update(RequestCardDTO card);

    public HttpStatus move(Location location);

    public HttpStatus delete(Card card);
}
