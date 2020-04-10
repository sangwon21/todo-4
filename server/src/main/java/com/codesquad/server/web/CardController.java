package com.codesquad.server.web;

import com.codesquad.server.domain.Card;
import com.codesquad.server.domain.Column;
import com.codesquad.server.domain.User;
import com.codesquad.server.repository.CardRepository;
import com.codesquad.server.repository.ColumnRepository;
import com.codesquad.server.repository.UserRepository;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/columns/{columnId}/cards")
public class CardController {
    private final Logger logger = LoggerFactory.getLogger(CardController.class);

    @Autowired
    UserRepository userRepository;

    @Autowired
    ColumnRepository columnRepository;

    @Autowired
    CardRepository cardRepository;

    @PostMapping("")
    public JSONObject create(@PathVariable Long columnId, @RequestBody Map<String, String> bodyMap) {


        User user = userRepository.findById(Long.parseLong(bodyMap.get("userIdx"))).orElseThrow(NoSuchElementException::new);
        Column column = columnRepository.findById(columnId).orElseThrow(NoSuchElementException::new);
        column.addCard(bodyMap.get("note"));
        columnRepository.save(column);


//        Card card = cardRepository.findById();

//        user.addColumn(bodyMap.get("columnName"));
//        userRepository.save(user);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("StatusCode", HttpStatus.CREATED.value());
        return jsonObject;
    }

    @GetMapping("")
    public List<Card> list(@PathVariable Long columnId) {
        Column column = columnRepository.findById(columnId).orElseThrow(NoSuchElementException::new);
        return column.getCards();
    }

    @PutMapping("/{cardId}")
    public JSONObject update(@PathVariable Long cardId, @RequestBody HashMap<String, String> bodyMap) {
        Card card = cardRepository.findById(cardId).orElseThrow(NoSuchElementException::new);
        card.setNote(bodyMap.get("afterNote"));
        cardRepository.save(card);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("StatusCode", HttpStatus.NO_CONTENT.value());
        return jsonObject;
    }

    @DeleteMapping("/{cardId}")
    public JSONObject delete(@PathVariable Long cardId) {
        Card card = cardRepository.findById(cardId).orElseThrow(NoSuchElementException::new);
        cardRepository.delete(card);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("StatusCode", HttpStatus.NO_CONTENT.value());
        return jsonObject;
    }
}
