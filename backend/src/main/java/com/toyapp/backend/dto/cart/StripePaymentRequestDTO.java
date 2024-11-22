package com.toyapp.backend.dto.cart;

import lombok.Data;

import java.util.List;

@Data
public class StripePaymentRequestDTO {
    private List<Long> cartItemIds;
}
