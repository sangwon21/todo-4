package com.codesquad.todo.web;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tables/items")
public class ItemController {

    @PostMapping("")
    private String create() {
        return null;
    }

    @PutMapping("")
    private String update() {
        return null;
    }

    @DeleteMapping("")
    private String delete() {
        return null;
    }
}
