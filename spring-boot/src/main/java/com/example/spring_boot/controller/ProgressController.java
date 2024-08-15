package com.example.spring_boot.controller;

import com.example.spring_boot.model.Progress;
import com.example.spring_boot.model.User;
import com.example.spring_boot.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    @PostMapping("/api/{progressId}/enroll")
    public ResponseEntity<User> enrollUserToProgress(@PathVariable Long progressId) {
        try {
            // Get the logged-in user's username
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = ((UserDetails) authentication.getPrincipal()).getUsername();

            User enrolledUser = progressService.enrollUserToProgress(progressId, username);
            return ResponseEntity.ok(enrolledUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping("/api/addProgress")
    public Progress addProgress(@RequestBody Progress progress) {
    try {
        return progressService.addProress(progress.getProgressType(), progress.getDuration());
    } catch (Exception e) {
        throw new RuntimeException("addProgress failed: " + e.getMessage());
        }
    }
}
