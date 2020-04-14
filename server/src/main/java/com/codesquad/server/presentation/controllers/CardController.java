package com.codesquad.server.presentation.controllers;

import com.codesquad.server.domain.entity.Card;
import com.codesquad.server.domain.service.CardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/columns/{columnId}/cards")
public class CardController {

    private final CardService cardService;

    @PostMapping("")
    public HttpStatus create(@RequestBody @Valid Card card) {
        log.info("card : {}", card);
        return cardService.save(card);
    }

    @GetMapping("")
    public List<Card> list(@PathVariable @Valid Long columnId) {
        return cardService.findAllById(columnId);
    }

    @PutMapping("")
    public HttpStatus update(@RequestBody @Valid Card card) {
        log.info("card : {}", card);
        return cardService.update(card);
    }

    @DeleteMapping("")
    public HttpStatus delete(@RequestBody @Valid Card card) {
        log.info("card : {}", card);
        return cardService.delete(card);
    }
}
