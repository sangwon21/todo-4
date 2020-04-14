package com.codesquad.server.presentation.controllers;

import com.codesquad.server.domain.entity.Card;
import com.codesquad.server.domain.entity.Columns;
import com.codesquad.server.domain.repository.CardRepository;
import com.codesquad.server.domain.repository.ColumnsRepository;
import com.codesquad.server.domain.service.CardService;
import com.codesquad.server.domain.service.ColumnsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.NoSuchElementException;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/columns/{columnId}/cards")
public class CardController {

//    private final ColumnsService columnsService;

    private final CardService cardService;

    @PostMapping("")
    public HttpStatus create(@RequestBody @Valid Card card) {
        return cardService.save(card);
    }

    @GetMapping("")
    public List<Card> list(@PathVariable @Valid Long columnId) {
//        return cardService.findAllById(columnId);
        return null;
    }

    @PutMapping("")
    public HttpStatus update(@RequestBody @Valid Card card) {
        return cardService.update(card);
    }

    @DeleteMapping("")
    public HttpStatus delete(@RequestBody @Valid Card card) {
        return cardService.delete(card);
//        Card card = cardRepository.findById(cardId).orElseThrow(NoSuchElementException::new);
//        cardRepository.delete(card);
//
//        JSONObject jsonObject = new JSONObject();
//        jsonObject.put("StatusCode", HttpStatus.NO_CONTENT.value());
//        return jsonObject;
    }
}
