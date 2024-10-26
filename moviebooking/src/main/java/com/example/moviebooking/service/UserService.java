package com.example.moviebooking.service;

import com.example.moviebooking.model.User;
import com.example.moviebooking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }
    public Optional<User> findUserById(Long userId) {
        return userRepository.findById(userId); // Assuming you have this method in your UserRepository
    }

    // public Optional<User> findUserById(Long userId) {
    //     // TODO Auto-generated method stub
    //     throw new UnsupportedOperationException("Unimplemented method 'findUserById'");
    // }
}
