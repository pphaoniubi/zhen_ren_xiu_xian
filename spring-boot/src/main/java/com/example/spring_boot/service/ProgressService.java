package com.example.spring_boot.service;

import com.example.spring_boot.model.ProgressType;
import com.example.spring_boot.model.User;
import com.example.spring_boot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.spring_boot.repository.ProgressRepository;
import com.example.spring_boot.model.Progress;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProgressService {

    private final ProgressRepository progressRepository;

    private final UserRepository userRepository;

    private static final int USER_THRESHOLD = 10;

    public ProgressService(ProgressRepository progressRepository, UserRepository userRepository) {
        this.progressRepository = progressRepository;
        this.userRepository = userRepository;
    }

    public Progress addProgress(ProgressType progressType, int duration) {
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

    public List<Progress> getAllProgress() {
        return progressRepository.findAll();
    }

    public boolean isProgressReady(Long progressId) {
        Progress progress = progressRepository.findById(progressId)
                .orElseThrow(() -> new RuntimeException("Progress not found"));
        int userCount = progress.getUsers().size();
        return userCount >= USER_THRESHOLD;
    }

    public int getNumberofUser(Long progressId){
        return progressRepository.countUsersByProgressId(progressId);
    }

    public List<User> geUserByProgressId(Long progressId) {
        return progressRepository.findUsersByProgressId(progressId);
    }

}