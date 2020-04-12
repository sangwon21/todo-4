package com.codesquad.server.domain.entity;

import com.codesquad.server.domain.value.SignUpRequestUser;
import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class User {

    @Id
    private Long id;
    private String userId;
    private String password;
    private List<Columns> columns;
    private String token;

    public User(SignUpRequestUser requestUser, String token) {
        this.userId = requestUser.getUserId();
        this.password = requestUser.getPassword();
        this.token = token;
    }
}
