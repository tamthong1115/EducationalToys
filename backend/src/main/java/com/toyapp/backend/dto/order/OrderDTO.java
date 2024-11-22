package com.toyapp.backend.dto.order;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
public class OrderDTO {
    private Integer id;
    private String userName;
    private String status;
    private BigDecimal totalPrice;
    private String orderType;
    private Instant createdAt;
    private Instant updatedAt;
    private List<OrderItemDTO> orderItems;

}
