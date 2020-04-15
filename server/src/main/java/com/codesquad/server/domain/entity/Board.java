package com.codesquad.server.domain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
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

    public void addHistory(Long id, String nickname, String action, String actingColumn,
                           String movedColumn, LocalDateTime changedTime, String contents) {
        histories.add(new History(id, nickname, action, actingColumn, movedColumn, changedTime, contents));
    }

    public void addColumn(Columns columns) {
        this.columns.add(columns);
    }
}
