package com.toyapp.backend.dto.user;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private int rewardPoints;
    private String roles;
}
