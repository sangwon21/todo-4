package com.codesquad.server.domain.value;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@ToString
public class SignUpRequestUser {

    @Id
    private Long id;

    @NotBlank
    private String userId;

    private String token;
}
