package com.codesquad.server.domain.repository;

import com.codesquad.server.domain.entity.Card;
import com.codesquad.server.domain.entity.Columns;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ColumnsRepository extends CrudRepository<Columns, Long> {
    @Query("select * from columns where id=:id")
    public List<Card> findAllByColumnsId(Long id);

    @Query("update * set title=:columns.title where id=:columns.id")
    public Columns update(Columns columns);
}
