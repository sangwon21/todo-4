package com.codesquad.server.web.mockup;

import com.codesquad.server.domain.Column;
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
public class MockupColumn {

    @Id
    private Long id;

    private Long previousId;

    private String title;

    private List<MockupCard> cards;
}
