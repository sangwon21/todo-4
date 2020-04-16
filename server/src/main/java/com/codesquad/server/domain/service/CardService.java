package com.codesquad.server.domain.service;

import com.codesquad.server.domain.value.RequestCardDTO;
import com.codesquad.server.domain.value.RequestLocationDTO;
import com.codesquad.server.domain.value.ResponseCardDTO;

import java.time.LocalDateTime;

public interface CardService {
    ResponseCardDTO save(RequestCardDTO requestCardDTO, Long id);

    LocalDateTime update(RequestCardDTO requestCardDTO);

    LocalDateTime move(RequestLocationDTO requestLocationDTO, Long id);

    LocalDateTime delete(RequestCardDTO requestCardDTO);
}
