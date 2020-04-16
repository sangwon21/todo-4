package com.codesquad.server.presentation.controllers;

import com.codesquad.server.domain.entity.Card;
import com.codesquad.server.domain.service.CardService;
import com.codesquad.server.domain.value.Location;
import com.codesquad.server.domain.value.RequestCardDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/columns/{columnsId}/cards")
public class CardController {

    private final CardService cardService;

    @PostMapping("")
    public ResponseEntity<Object> create(@PathVariable Long columnsId, @RequestBody @Valid RequestCardDTO requestCardDTO) {
        log.info("card : {}", requestCardDTO.getCard());
        return cardService.save(requestCardDTO, columnsId);
    }

    @PutMapping("/{cardId}")
    public HttpStatus update(@PathVariable Long columnsId, @PathVariable Long cardId, @RequestBody @Valid RequestCardDTO requestCardDTO) {
        log.info("requestCardDTO : {}", requestCardDTO);
        return cardService.update(requestCardDTO);
    }

    @PutMapping("/{cardId}/move")
    public HttpStatus move(@PathVariable Long columnsId, @PathVariable Long cardId, @RequestBody @Valid Location locaiton) {
        return cardService.move(locaiton);
    }

    @DeleteMapping("/{cardId}")
    public HttpStatus delete(@RequestBody @Valid Card card) {
        log.info("card : {}", card);
        return cardService.delete(card);
    }
}
