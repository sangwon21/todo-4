package com.codesquad.server.domain.entity;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class Board {

    @Id
    private Long id;
    private List<Columns> columns = new ArrayList<>();
    private List<History> histories = new ArrayList<>();

    public void addHistory(String action) {
        histories.add(new History(action));
    }

    public void addColumn(String title) {
        columns.add(new Columns(title));
    }

}
