package com.toyapp.backend.controller.user;

import com.toyapp.backend.dto.order.OrderDTO;
import com.toyapp.backend.service.OrderService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user/order")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }


    @GetMapping("/get-orders-by-user")
    public List<OrderDTO> getOrdersByUser() {
        return orderService.getOrdersByUser();
    }

    @GetMapping("/get-order-by-id")
    public OrderDTO getOrderById(@RequestParam Long id) {
        return orderService.getOrderById(id);
    }

}
