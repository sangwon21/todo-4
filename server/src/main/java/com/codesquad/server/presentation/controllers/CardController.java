package com.codesquad.server.presentation.controllers;

import com.codesquad.server.domain.service.CardService;
import com.codesquad.server.domain.value.RequestCardDTO;
import com.codesquad.server.domain.value.RequestLocationDTO;
import com.codesquad.server.domain.value.ResponseCardDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/columns/{columnId}/cards")
public class CardController {

    private final CardService cardService;

    @ResponseStatus(value = HttpStatus.CREATED)
    @PostMapping("")
    public ResponseCardDTO create(@PathVariable Long columnId, @RequestBody @Valid RequestCardDTO requestCardDTO) {
        log.info("card : {}", requestCardDTO.getCard());
        return cardService.save(requestCardDTO, columnId);
    }

    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @PutMapping("/{cardId}")
    public LocalDateTime update(@PathVariable Long columnId, @PathVariable Long cardId, @RequestBody @Valid RequestCardDTO requestCardDTO) {
        log.info("requestCardDTO : {}", requestCardDTO);
        return cardService.update(requestCardDTO);
    }

    @PutMapping("/{cardId}/move")
    public LocalDateTime move(@PathVariable Long columnId, @PathVariable Long cardId, @RequestBody @Valid RequestLocationDTO requestLocationDTO) {
        return cardService.move(requestLocationDTO, cardId);
    }

    @DeleteMapping("/{cardId}")
    public LocalDateTime delete(@PathVariable Long columnId, @PathVariable Long cardId, @RequestBody @Valid RequestCardDTO requestCardDTO) {
        return cardService.delete(requestCardDTO);
    }
}
