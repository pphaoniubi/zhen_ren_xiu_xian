package com.example.spring_boot.controller;

import com.example.spring_boot.model.Progress;
import com.example.spring_boot.model.User;
import com.example.spring_boot.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    @Autowired
    private ProgressService progressService;



    @PostMapping("/{progressId}/enrol")
    public ResponseEntity<User> enrollUserToProgress(@PathVariable Long progressId) {
        try {
            // Get the logged-in user's username
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            if (username.equals("anonymousUser")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }

            User enrolledUser = progressService.enrollUserToProgress(progressId, username);
            return ResponseEntity.ok(enrolledUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping("/add")
    public Progress addProgress(@RequestBody Progress progress) {
    try {

        System.out.println("Received progressType: " + progress.getProgressType());
        System.out.println("Received duration: " + progress.getDuration());
        return progressService.addProgress(progress.getProgressType(), progress.getDuration());
    } catch (Exception e) {
        throw new RuntimeException("addProgress failed: " + e.getMessage());
        }
    }

    @GetMapping("/getAll")
    public List<Progress> getAllProgress(){
        return progressService.getAllProgress();
    }

    @GetMapping("/{progressId}/checkReady")
    public ResponseEntity<Boolean> checkIfProgressReady(@PathVariable Long progressId) {
        boolean isReady = progressService.isProgressReady(progressId);
        return ResponseEntity.ok(isReady);
    }

    @GetMapping("/{id}/user-count")
    public int getUserCount(@PathVariable Long id) {
        return progressService.getNumberofUser(id);
    }
    @GetMapping("/{id}/getUsersById")
    public List<User> getUserById(@PathVariable Long id) {
        return progressService.geUserByProgressId(id);
    }
}
