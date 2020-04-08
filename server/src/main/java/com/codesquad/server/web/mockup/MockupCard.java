package com.codesquad.server.web.mockup;

import com.codesquad.server.domain.Card;
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
public class MockupCard {

    @Id
    private Long id;

    private Long previousId;

    private String note;
}
