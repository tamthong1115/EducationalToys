package com.toyapp.backend.service;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class TokenService {
    private final StringRedisTemplate redisTemplate;

    public TokenService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public String generateToken(String email) {
        String token = UUID.randomUUID().toString();
        redisTemplate.opsForValue().set(token, email, 10, TimeUnit.MINUTES);
        return token;
    }

    public String getEmailByToken(String token) {
        return redisTemplate.opsForValue().get(token);
    }

    public void deleteToken(String token) {
        redisTemplate.delete(token);
    }
}
