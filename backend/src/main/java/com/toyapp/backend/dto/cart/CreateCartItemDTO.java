package com.toyapp.backend.dto.cart;

import lombok.Data;

@Data
public class CreateCartItemDTO {
    private Long ToyId;
    private Integer quantity;
}
