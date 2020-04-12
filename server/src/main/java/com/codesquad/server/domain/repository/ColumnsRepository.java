package com.codesquad.server.domain.repository;

import com.codesquad.server.domain.entity.Columns;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ColumnsRepository extends CrudRepository<Columns, Long> {
    @Query("SELECT * FROM column WHERE name = :name")
    Optional<Columns> findColumnByName(String name);

    @Query("SELECT count(*) FROM card WHERE column = :columnName")
    int countColumnforUser(String columnName);
}
