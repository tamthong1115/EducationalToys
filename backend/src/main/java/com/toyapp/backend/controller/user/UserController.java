package com.toyapp.backend.controller.user;

import com.toyapp.backend.dto.user.UserDTO;
import com.toyapp.backend.model.Role;
import com.toyapp.backend.model.User;
import com.toyapp.backend.repository.UserRepository;
import com.toyapp.backend.service.AuthenticationService;
import com.toyapp.backend.service.JwtService;
import com.toyapp.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;

    public UserController(JwtService jwtService, AuthenticationService authenticationService, UserDetailsService userDetailsService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.userDetailsService = userDetailsService;
        this.userRepository = userRepository;
    }


    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser() {
        return ResponseEntity.ok(authenticationService.getCurrentUser());
    }

    @PostMapping("/validate-token")
    public ResponseEntity<Boolean> validateToken(@RequestBody Map<String, String> tokenMap) {
        String token = tokenMap.get("token");
        final String userEmail = jwtService.extractUsername(token);
        if (userEmail != null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            if (jwtService.isTokenValid(token, userDetails)) {
                return ResponseEntity.ok(true);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
    }

    @GetMapping("/roles")
    public ResponseEntity<List<String>> getUserRoles() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        List<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(roles);
    }

    @PutMapping("/update")
    public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO userDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        String userEmail = authentication.getName();
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        user.setName(userDTO.getName());
        user.setPhone(userDTO.getPhone());
        user.setAddress(userDTO.getAddress());
        user.setRewardPoints(userDTO.getRewardPoints());

        userRepository.save(user);

        UserDTO updatedUserDTO = new UserDTO();
        updatedUserDTO.setId(user.getId());
        updatedUserDTO.setName(user.getName());
        updatedUserDTO.setEmail(user.getEmail());
        updatedUserDTO.setPhone(user.getPhone());
        updatedUserDTO.setAddress(user.getAddress());
        updatedUserDTO.setRewardPoints(user.getRewardPoints());
        updatedUserDTO.setRoles(user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.joining(", ")));

        return ResponseEntity.ok(updatedUserDTO);
    }

}
