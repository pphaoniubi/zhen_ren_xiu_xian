package com.example.spring_boot.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name="app_user")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
     private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Sex sex;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_progress",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "progress_id")
    )
    @JsonIgnoreProperties("user")
    private List<Progress> progresses;

    public List<Progress> getProgress() {
        return progresses;
    }

    public void setProgress(List<Progress> progresses) {
        this.progresses = progresses;
    }

    public User() {
    }

    public User(String username, String email, String password, Sex sex) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.sex = sex;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Sex getSex() {
        return sex;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

}
