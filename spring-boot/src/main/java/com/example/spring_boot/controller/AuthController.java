package com.example.spring_boot.controller;

import com.example.spring_boot.model.User;
import com.example.spring_boot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;

    @PostMapping("api/users/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            //get previous authenticated user information
            Authentication prev_auth = SecurityContextHolder.getContext().getAuthentication();

            //check if a prev user is logged in
            if (prev_auth != null && prev_auth.isAuthenticated()
                     && !prev_auth.getPrincipal().equals("anonymousUser")
                     && ((UserDetails)(prev_auth.getPrincipal())).getUsername().equals(user.getUsername())){

                return ResponseEntity.status(401).body("User Already Logged in");
            }

                // Authenticate the user using the authentication manager
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

                // Set the authentication in the security context
                SecurityContextHolder.getContext().setAuthentication(authentication);

                // Load user details after successful authentication
                UserDetails userDetails_ret = userService.loadUserByUsername(user.getUsername());

                return ResponseEntity.ok(userDetails_ret);


        } catch (Exception e) {

            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    @GetMapping("api/users/logout")
    public String logout(HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        HttpSession session = request.getSession(false);
        if (authentication != null && session != null) {
            session.invalidate();
            SecurityContextHolder.getContext().setAuthentication(null);
            SecurityContextHolder.clearContext();
            return "logged out successfully";
        } else {
            return "no active user";
        }
    }

    @GetMapping("api/users/isAuthenticated")
    public boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Authentication Object: " + authentication);
        return authentication.isAuthenticated() && !(authentication.getPrincipal().equals("anonymousUser"));
    }
}
