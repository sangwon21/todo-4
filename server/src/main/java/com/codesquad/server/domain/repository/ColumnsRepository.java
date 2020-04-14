package com.codesquad.server.domain.repository;

import com.codesquad.server.domain.entity.Card;
import com.codesquad.server.domain.entity.Columns;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColumnsRepository extends CrudRepository<Columns, Long> {
    @Query("select * from columns where id=:id")
    public List<Card> findAllByColumnsId(Long id);

    @Query("update columns set title=:title where id=:id")
    @Modifying
    public Integer update(String title, Long id);
}
