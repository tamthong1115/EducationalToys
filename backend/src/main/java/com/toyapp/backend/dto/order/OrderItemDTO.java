package com.toyapp.backend.dto.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemDTO {
    private Integer id;
    private Integer orderId;
    private Long toyId;
    private Integer quantity;
    private BigDecimal price;
    private String rentalDuration;
    private String[] imageUrls;
}
