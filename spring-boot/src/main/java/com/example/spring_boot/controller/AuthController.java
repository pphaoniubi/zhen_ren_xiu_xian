package com.example.spring_boot.controller;

import com.example.spring_boot.model.User;
import com.example.spring_boot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;

    @PostMapping("api/users/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            // Authenticate the user using the authentication manager
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

            // Set the authentication in the security context
            SecurityContextHolder.getContext().setAuthentication(authentication);

            if (authentication != null && authentication.isAuthenticated()
                    && !authentication.getPrincipal().equals("anonymousUser")
            && ((UserDetails)(authentication.getPrincipal())).getUsername().equals(user.getUsername())) {
                System.out.println("user already logged in " + user.getUsername());
            }

            // Load user details after successful authentication
            UserDetails userDetails = userService.loadUserByUsername(user.getUsername());

            System.out.println(authentication);

            // Return user details as a response (this is optional, you may return a JWT token here instead)
            return ResponseEntity.ok(userDetails);
        } catch (Exception e) {
            // In case of authentication failure, return a 401 status

            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
}
