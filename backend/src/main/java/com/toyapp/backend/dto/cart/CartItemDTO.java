package com.toyapp.backend.dto.cart;

import lombok.Data;

@Data
public class CartItemDTO {
    private Long id;
    private Long toyId;
    private Integer stock;
    private String name;
    private String description;
    private Double price;
    private Integer quantity;
    private Double totalPrice;
    private String[] imageUrls;
}
