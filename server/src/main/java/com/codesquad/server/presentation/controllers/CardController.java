package com.codesquad.server.presentation.controllers;

import com.codesquad.server.domain.entity.Card;
import com.codesquad.server.domain.service.CardService;
import com.codesquad.server.domain.value.Location;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/columns/{columnsId}/cards")
public class CardController {

    private final CardService cardService;

    @PostMapping("")
    public HttpStatus create(@PathVariable Long columnsId, @RequestBody @Valid Card card) {
        log.info("card : {}", card);
        return cardService.save(card, columnsId);
    }

    @PutMapping("")
    public HttpStatus update(@RequestBody @Valid Card card) {
        log.info("card : {}", card);
        return cardService.update(card);
    }

    @PutMapping("/move")
    public HttpStatus move(@RequestBody @Valid Location locaiton) {
        return cardService.move(locaiton);
    }

    @DeleteMapping("")
    public HttpStatus delete(@RequestBody @Valid Card card) {
        log.info("card : {}", card);
        return cardService.delete(card);
    }
}
