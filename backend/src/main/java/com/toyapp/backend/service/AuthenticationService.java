package com.toyapp.backend.service;

import com.toyapp.backend.dto.auth.LoginRequestDTO;
import com.toyapp.backend.dto.auth.RegisterRequestDTO;
import com.toyapp.backend.dto.user.UserDTO;
import com.toyapp.backend.model.Cart;
import com.toyapp.backend.model.Role;
import com.toyapp.backend.model.User;
import com.toyapp.backend.repository.CartRepository;
import com.toyapp.backend.repository.RoleRepository;
import com.toyapp.backend.repository.UserRepository;
import io.github.cdimascio.dotenv.Dotenv;
import jakarta.mail.MessagingException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Collections;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final CartRepository cartRepository;
    private final TokenService tokenService;
    private final EmailService emailService;

    public AuthenticationService(
            AuthenticationManager authenticationManager,
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder, CartRepository cartRepository,
            TokenService tokenService, EmailService emailService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.cartRepository = cartRepository;
        this.tokenService = tokenService;
        this.emailService = emailService;
    }

    public User register(RegisterRequestDTO input) {
        User user = new User();
        user.setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setName(input.getName());
        user.setActivated(false);
        // disable user till they click on confirmation link
        Role role = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));

        user.setRoles(Collections.singleton(role));

        User savedUser = userRepository.save(user);

        Cart cart = new Cart();
        cart.setUser(savedUser);
        cartRepository.save(cart);

        sendEmailConfirm(savedUser, input.getEmail());

        return savedUser;
    }

    public User confirmToken(String token) {
        String email = tokenService.getEmailByToken(token);
        if (email == null) {
            throw new RuntimeException("Invalid or expired token");
        }
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setActivated(true);
        userRepository.save(user);
        tokenService.deleteToken(token);

        return user;
    }

    public User login(LoginRequestDTO loginRequestDTO) {

        User user = userRepository.findByEmail(loginRequestDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(loginRequestDTO.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        if (!user.isActivated()) {
            // send email again
            sendEmailConfirm(user, user.getEmail());

            throw new RuntimeException("Please confirm your email");
        }


        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestDTO.getEmail(),
                        loginRequestDTO.getPassword()
                )
        );

        return user;

    }

    private void sendEmailConfirm(User user, String email) {
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

        String FRONTEND_URL = dotenv.get("FRONTEND_URL");

        String token = tokenService.generateToken(email);
        String confirmationUrl = FRONTEND_URL + "/confirmToken?token=" + token;
        try {
            emailService.sendEmail(user.getEmail(), "Confirm your email", user.getName(), confirmationUrl);
        } catch (RuntimeException | MessagingException e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public UserDTO getCurrentUser() {
        User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToUserDTO(user);
    }

    private UserDTO mapToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhone(user.getPhone());
        userDTO.setAddress(user.getAddress());
        userDTO.setRewardPoints(user.getRewardPoints());
        userDTO.setRoles(user.getRoles().stream().findFirst().get().getName());
        return userDTO;
    }
}
