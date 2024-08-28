package com.example.spring_boot.controller;

import com.example.spring_boot.model.Progress;
import com.example.spring_boot.model.User;
import com.example.spring_boot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        try {
            return userService.registerUser(user.getUsername(), user.getEmail(), user.getPassword(), user.getSex());
        } catch (Exception e) {
            throw new RuntimeException("Registration failed: " + e.getMessage());
        }
    }

    @GetMapping("/getProgressByUser")
    public ResponseEntity<List<Progress>> getProgressesForCurrentUser() throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        List<Progress> progresses = userService.getProgressByUsername(username);
        return ResponseEntity.ok(progresses);
    }

}
