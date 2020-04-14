package com.codesquad.server.domain.repository;

import com.codesquad.server.domain.entity.Card;
import org.springframework.data.repository.CrudRepository;

public interface CardRepository extends CrudRepository<Card, Long> {
}
