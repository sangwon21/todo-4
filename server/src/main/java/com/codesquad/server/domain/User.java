package com.codesquad.server.domain;
import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {

    @Id
    private Long id;
    private String userId;
    private String password;

    private List<Column> columns = new ArrayList<>();

    public void addColumn(String name) {
        columns.add(new Column(name));
    }
}
