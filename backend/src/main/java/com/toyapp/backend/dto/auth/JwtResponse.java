package com.toyapp.backend.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class JwtResponse {
    private final String token;
    private long expirationTime;
    private boolean isAdmin;


}

