package com.example.moviebooking.repository;

import com.example.moviebooking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

// public interface UserRepository extends JpaRepository<User, Long> {
//     Optional<User> findByUsername(String username);
// }

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}