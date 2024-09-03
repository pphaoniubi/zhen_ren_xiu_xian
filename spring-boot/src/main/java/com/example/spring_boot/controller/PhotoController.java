package com.example.spring_boot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.spring_boot.service.PhotoService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/photo")
public class PhotoController {

    private final PhotoService photoStorageService;

    @Autowired
    public PhotoController(PhotoService photoStorageService) {
        this.photoStorageService = photoStorageService;
    }

    @PostMapping("/add/{progressId}")
    public ResponseEntity<String> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "progressId") Long progressId) {
        String fileName = photoStorageService.storeFile(file, progressId);
        return ResponseEntity.ok("File uploaded successfully: " + fileName);
    }
}
