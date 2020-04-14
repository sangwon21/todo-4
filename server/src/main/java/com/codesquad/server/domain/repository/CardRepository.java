package com.codesquad.server.domain.repository;

import com.codesquad.server.domain.entity.Card;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

public interface CardRepository extends CrudRepository<Card, Long> {
    @Query("update card set note=:card.note where id=:card.id")
    public Card update(Card card);
}
