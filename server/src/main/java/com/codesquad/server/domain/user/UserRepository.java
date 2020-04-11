package com.codesquad.server.domain.user;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {

    @Query("SELECT * FROM user WHERE user_id = :userId")
    Optional<User> findUserByUserId(String userId);

    
    @Query("SELECT count(*) FROM columns WHERE user = :userId")
    int countColumnsforUser(Long userId);
}
