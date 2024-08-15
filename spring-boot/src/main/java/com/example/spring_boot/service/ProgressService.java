package com.example.spring_boot.service;

import com.example.spring_boot.model.ProgressType;
import com.example.spring_boot.model.User;
import com.example.spring_boot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.spring_boot.repository.ProgressRepository;
import com.example.spring_boot.model.Progress;

import java.time.LocalDateTime;

@Service
public class ProgressService {

    private final ProgressRepository progressRepository;

    private final UserRepository userRepository;


    public ProgressService(ProgressRepository progressRepository, UserRepository userRepository) {
        this.progressRepository = progressRepository;
        this.userRepository = userRepository;
    }

    public Progress addProress(ProgressType progressType, int duration) {
        Progress progress = new Progress(LocalDateTime.now(), progressType, duration);
        return progressRepository.save(progress);
    }

    public User enrollUserToProgress(Long progressId, String username) {
        Progress progress = progressRepository.findById(progressId)
                .orElseThrow(() -> new RuntimeException("Progress not found"));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if the progress already has 10 users
        if (progress.getUsers().size() >= 10) {
            throw new RuntimeException("Cannot enroll more than 10 users in this progress");
        }

        // Set the user's progress and save
        user.getProgress().add(progress);
        progress.getUsers().add(user);
        userRepository.save(user);
        progressRepository.save(progress);
        return user;
    }

}