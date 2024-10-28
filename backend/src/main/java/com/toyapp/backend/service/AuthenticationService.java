package com.toyapp.backend.service;

import com.toyapp.backend.dto.auth.LoginRequestDTO;
import com.toyapp.backend.dto.auth.RegisterRequestDTO;
import com.toyapp.backend.model.Role;
import com.toyapp.backend.model.User;
import com.toyapp.backend.repository.RoleRepository;
import com.toyapp.backend.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;

    private final RoleRepository roleRepository;
    
    private final PasswordEncoder passwordEncoder;
    
    private final AuthenticationManager authenticationManager;
    
    public AuthenticationService(
            AuthenticationManager authenticationManager,
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder
    ){
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    public User register(RegisterRequestDTO input){
        User user = new User();
        user.setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setName(input.getName());

        Role role = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));

        user.setRoles(Collections.singleton(role));
        
        return userRepository.save(user);
    }
    
    public User login(LoginRequestDTO loginRequestDTO){
        
        User user = userRepository.findByEmail(loginRequestDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if(!passwordEncoder.matches(loginRequestDTO.getPassword(), user.getPassword())){
            throw new RuntimeException("Invalid password");
        }
        
        
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestDTO.getEmail(),
                        loginRequestDTO.getPassword()
                )
        );
        
        return user;
        
    }
}
