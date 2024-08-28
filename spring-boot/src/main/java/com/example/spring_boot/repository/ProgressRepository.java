package com.example.spring_boot.repository;

import com.example.spring_boot.model.Progress;
import com.example.spring_boot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProgressRepository extends JpaRepository<Progress, Long> {

    @Query("SELECT size(p.users) FROM Progress p WHERE p.id = :progressId")
    int countUsersByProgressId(@Param("progressId") Long progressId);

    @Query("SELECT p.users FROM Progress p WHERE p.id = :progressId")
    List<User> findUsersByProgressId(@Param("progressId") Long progressId);
}