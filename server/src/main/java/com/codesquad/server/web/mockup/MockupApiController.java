package com.codesquad.server.web.mockup;

import com.codesquad.server.domain.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/columns")
public class MockupApiController {

    @GetMapping("")
    public ResponseEntity<Response> listColumns() {
        MockupCard card1 = new MockupCard(1L, null, "content1");
        MockupCard card2 = new MockupCard(2L, 1L, "content1");
        MockupCard card3 = new MockupCard(3L, 2L, "content1");

        List<MockupCard> cards1 = new ArrayList<>();
        cards1.add(card1);
        cards1.add(card2);

        List<MockupCard> cards2 = new ArrayList<>();
        cards2.add(card3);

        MockupColumn column1 = new MockupColumn(1L, null, "column1", cards1);
        MockupColumn column2 = new MockupColumn(2L, 1L, "column2", cards2);

        List<MockupColumn> columns = new ArrayList<>();
        columns.add(column1);
        columns.add(column2);

        Response response = new Response("전체 목록 생성", columns);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/{columnId}")
    public HttpStatus updateColumnName(@PathVariable Long columnId) {
        return HttpStatus.ACCEPTED;
    }

    @PostMapping("/{columnId}/cards")
    public HttpStatus create(@PathVariable Long columnId) {
        return HttpStatus.CREATED;
    }

    @PutMapping("/{columnId}/cards/{id}")
    public HttpStatus updateCardContent(@PathVariable Long columnId, @PathVariable Long id) {
        return HttpStatus.ACCEPTED;
    }

    @DeleteMapping("/{columnId}/cards/{id}")
    public HttpStatus delete(@PathVariable Long columnId, @PathVariable Long id) {
        return HttpStatus.ACCEPTED;
    }

    @PutMapping("/{columnId}/cards/{id}/2/1")
    public HttpStatus updatePosition(@PathVariable Long columnId, @PathVariable Long id) {
        return HttpStatus.OK;
    }
}
