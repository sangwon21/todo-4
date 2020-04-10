package com.codesquad.server.repository;

import com.codesquad.server.domain.Columns;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ColumnRepository extends CrudRepository<Columns, Long> {
    @Query("SELECT * FROM columns WHERE name = :name")
    Optional<Columns> findColumnByName(String name);

    @Query("SELECT count(*) FROM card WHERE columns = :columnName")
    int countColumnforUser(String columnName);
}
