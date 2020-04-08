package com.codesquad.server.web.mockup;
import com.codesquad.server.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MockupUser {

    @Id
    private Long id;

    private String userId;

    private String password;

    private List<MockupColumn> columns;
}
