package com.example.spring_boot.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SessionController  extends RuntimeException {
        @GetMapping("/check-login")
        public String checkIfUserIsLoggedIn() {
            // Retrieve the current authentication object
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            // Check if the user is authenticated
            if (authentication != null && authentication.isAuthenticated() && !"anonymousUser".equals(authentication.getPrincipal())) {
                 return "User is already logged in";
            }

            // If no user is authenticated, allow access
            return "No user is logged in";

    }
}
