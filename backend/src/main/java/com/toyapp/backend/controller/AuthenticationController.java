package com.toyapp.backend.controller;


import com.toyapp.backend.dto.ExceptionResponse;
import com.toyapp.backend.dto.auth.JwtResponse;
import com.toyapp.backend.dto.auth.LoginRequestDTO;
import com.toyapp.backend.dto.auth.RegisterRequestDTO;
import com.toyapp.backend.exception.CustomException;
import com.toyapp.backend.model.User;
import com.toyapp.backend.service.AuthenticationService;
import com.toyapp.backend.service.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequestDTO registerRequestDTO) {
        User user = authenticationService.register(registerRequestDTO);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginRequestDTO loginRequestDTO) {
        User user = authenticationService.login(loginRequestDTO);

        if (user == null) {
            throw new CustomException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        String token = jwtService.generateToken(user);

        boolean isAdmin = user.getRoles().stream().anyMatch(role -> role.getName().equals("ADMIN"));

        return ResponseEntity.ok(new JwtResponse(token, jwtService.getExpirationTime(), isAdmin));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        SecurityContextHolder.clearContext();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
