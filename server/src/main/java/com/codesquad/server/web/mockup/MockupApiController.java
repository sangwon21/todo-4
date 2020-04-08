package com.codesquad.server.web.mockup;

import com.codesquad.server.domain.Card;
import com.codesquad.server.domain.Column;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/mockup/columns")
public class MockupApiController {

    @GetMapping("")
    public ResponseEntity<List<MockupColumn>> listColumns() {
        MockupCard card1 = new MockupCard(new Card(1L, null, "content1"));
        MockupCard card2 = new MockupCard(new Card(2L, 1L, "content1"));
        MockupCard card3 = new MockupCard(new Card(3L, 2L, "content1"));

        List<MockupCard> cards1 = new ArrayList<>();
        cards1.add(card1);
        cards1.add(card2);

        List<MockupCard> cards2 = new ArrayList<>();
        cards2.add(card3);

        MockupColumn column1 = new MockupColumn(new Column(1L, null, "column1"), cards1);
        MockupColumn column2 = new MockupColumn(new Column(2L, 1L, "column2"), cards2);

        List<MockupColumn> columns = new ArrayList<>();
        columns.add(column1);
        columns.add(column2);

        return new ResponseEntity<>(columns, HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/1")
    public String updateColumnName() {
        return null;
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/1/cards")
    public String create() {
        return null;
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/1/cards/2")
    public String updateCardContent() {
        return null;
    }

    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping("/1/cards/2")
    public String delete() {
        return null;
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/1/cards/2/2/1")
    public String updatePosition() {
        return null;
    }
}
