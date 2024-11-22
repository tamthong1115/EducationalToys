package com.toyapp.backend.dto.cart;

import lombok.Data;

import java.util.List;

@Data
public class RequestConfirmPaymentDTO {
    private String paymentIntentId;
    private Long userId;
    private List<Long> cartItemIds;
}
