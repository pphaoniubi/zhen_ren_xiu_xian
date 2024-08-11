package com.example.spring_boot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.spring_boot.repository.ProgressRepository;
import com.example.spring_boot.model.Progress;

import java.time.LocalDateTime;

@Service
public class ProgressService {

    private final ProgressRepository progressRepository;

    @Autowired
    public ProgressService(ProgressRepository progressRepository) {
        this.progressRepository = progressRepository;
    }

    public Progress saveProgress() {
        Progress progress = new Progress(LocalDateTime.now());
        return progressRepository.save(progress);
    }

    public Progress getLatestProgress() {
        return progressRepository.findAll()
                .stream()
                .reduce((first, second) -> second)
                .orElse(null);
    }
}
