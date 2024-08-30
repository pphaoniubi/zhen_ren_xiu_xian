package com.example.spring_boot.service;

import com.example.spring_boot.model.Photo;
import com.example.spring_boot.model.Progress;
import com.example.spring_boot.model.User;
import com.example.spring_boot.repository.PhotoRepository;
import com.example.spring_boot.repository.ProgressRepository;
import com.example.spring_boot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class PhotoService {

    private final Path fileStorageLocation;
    private final UserRepository userRepository;
    private final PhotoRepository photoRepository;
    private final ProgressRepository progressRepository;

    public PhotoService(@Value("${file.upload-dir}") String uploadDir,
                        UserRepository userRepository,
                        PhotoRepository photoRepository,
                        ProgressRepository progressRepository) {

        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        this.userRepository = userRepository;
        this.photoRepository = photoRepository;
        this.progressRepository = progressRepository;

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }


    public String storeFile(MultipartFile file, Long userId, Long progressId) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            if (fileName.contains("..")) {
                throw new RuntimeException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            // Link photo to user and progress
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            Photo photo = new Photo();
            photo.setFileName(fileName);
            photo.setUser(user);

            if (progressId != null) {
                Progress progress = progressRepository.findById(progressId)
                        .orElseThrow(() -> new RuntimeException("Progress not found"));
                photo.setProgress(progress);
            }

            photoRepository.save(photo);

            return fileName;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }
}
