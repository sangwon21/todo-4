package com.codesquad.server.domain.service;

import com.codesquad.server.domain.value.RequestCardDTO;
import com.codesquad.server.domain.value.RequestLocationDTO;
import com.codesquad.server.domain.value.ResponseDTO;

import java.time.LocalDateTime;

public interface CardService {
    ResponseDTO save(RequestCardDTO requestCardDTO, Long id);

    LocalDateTime update(RequestCardDTO requestCardDTO);

    LocalDateTime move(RequestLocationDTO requestLocationDTO);

    LocalDateTime delete(RequestCardDTO requestCardDTO);
}
