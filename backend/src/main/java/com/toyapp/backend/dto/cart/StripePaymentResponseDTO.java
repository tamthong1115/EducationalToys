package com.toyapp.backend.dto.cart;

import lombok.Data;

@Data
public class StripePaymentResponseDTO {
    private String paymentIntentId;
    private String clientSecret;
    private Double totalPrice;
}
