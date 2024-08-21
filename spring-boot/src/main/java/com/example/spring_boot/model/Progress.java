package com.example.spring_boot.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Entity
public class Progress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startTime;

    @ManyToMany(mappedBy = "progresses", fetch = FetchType.LAZY)
    @JsonIgnoreProperties("progress")
    private List<User> users;

    @Enumerated(EnumType.STRING)
    private ProgressType progressType;

    private int duration;
    public Progress() {}

    public Progress(LocalDateTime startTime, ProgressType progressType, int duration) {
        this.startTime = startTime;
        this.progressType = progressType;
        this.duration = duration;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProgressType getProgressType() {
        return progressType;
    }

    public void setProgressType(ProgressType progressType) {
        this.progressType = progressType;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
