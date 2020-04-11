package com.codesquad.server.domain.user;

import com.codesquad.server.domain.columns.Columns;
import lombok.*;
import org.springframework.data.annotation.Id;

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
    private List<Columns> columns;
    private String token;
}
