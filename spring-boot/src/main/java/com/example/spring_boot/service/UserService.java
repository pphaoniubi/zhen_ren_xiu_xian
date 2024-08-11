package com.example.spring_boot.service;

import com.example.spring_boot.model.User;
import com.example.spring_boot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.spring_boot.model.Sex;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User registerUser(String username, String email, String password, Sex sex) throws Exception {
        // Check if the username is already taken
        Optional<User> existingUser = userRepository.findByUsername(username);
        if (existingUser.isPresent()) {
            throw new Exception("Username is already taken");
        }

        // Check if the email is already registered
        Optional<User> existingEmail = userRepository.findByEmail(email);
        if (existingEmail.isPresent()) {
            throw new Exception("Email is already registered");
        }

        // Hash the password
        String encodedPassword = passwordEncoder.encode(password);

        // Create and save the user
        User user = new User(username, email, encodedPassword, sex);
        return userRepository.save(user);
    }
}
