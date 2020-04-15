package com.codesquad.server.domain.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class Board {

    @Id
    private Long id;

    private LocalDateTime createdTime;

    private List<Columns> columns = new ArrayList<>();

    private List<History> histories = new ArrayList<>();

    public void addHistory(History history) {
        histories.add(history);
    }

    public void addColumn(Columns columns) {
        this.columns.add(columns);
    }
}
