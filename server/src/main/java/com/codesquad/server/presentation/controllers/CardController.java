package com.codesquad.server.presentation.controllers;

import com.codesquad.server.domain.entity.Card;
import com.codesquad.server.domain.entity.Columns;
import com.codesquad.server.domain.repository.CardRepository;
import com.codesquad.server.domain.repository.ColumnsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/columns/{columnId}/cards")
public class CardController {

    private final ColumnsRepository columnsRepository;

    private final CardRepository cardRepository;

    @PostMapping("")
    public HttpStatus create(@RequestBody Card card) {
        return HttpStatus.CREATED;
    }

    @GetMapping("")
    public List<Card> list(@PathVariable Long columnId) {
        Columns columns = columnsRepository.findById(columnId).orElseThrow(NoSuchElementException::new);
        return columns.getCards();
    }

    @PutMapping("")
    public HttpStatus update(@RequestBody Card card) {
        return HttpStatus.NO_CONTENT;
    }

    @DeleteMapping("")
    public HttpStatus delete(@RequestBody Card card) {
        return HttpStatus.NO_CONTENT;
//        Card card = cardRepository.findById(cardId).orElseThrow(NoSuchElementException::new);
//        cardRepository.delete(card);
//
//        JSONObject jsonObject = new JSONObject();
//        jsonObject.put("StatusCode", HttpStatus.NO_CONTENT.value());
//        return jsonObject;
    }
}
