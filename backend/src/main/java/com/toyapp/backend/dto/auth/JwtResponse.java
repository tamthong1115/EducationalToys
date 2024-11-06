package com.toyapp.backend.dto.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse {
    private final String token;

    private long expirationTime;

    public JwtResponse(String token, long expirationTime) {
        this.token = token;
        this.expirationTime = expirationTime;
    }

}

