package com.example.spring_boot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.spring_boot.service.PhotoStorageService;

@RestController
@RequestMapping("/api/photo")
public class PhotoStorageController {

    private final PhotoStorageService photoStorageService;

    @Autowired
    public PhotoStorageController(PhotoStorageService photoStorageService) {
        this.photoStorageService = photoStorageService;
    }
}
