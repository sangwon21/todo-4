package com.codesquad.todo.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Table extends BaseTodo {

    @Id
    private Long id;

    private List<Item> items;
}
