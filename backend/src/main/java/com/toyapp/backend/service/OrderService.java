package com.toyapp.backend.service;

import com.toyapp.backend.dto.order.OrderDTO;
import com.toyapp.backend.dto.order.OrderItemDTO;
import com.toyapp.backend.model.Order;
import com.toyapp.backend.model.OrderItem;
import com.toyapp.backend.repository.OrderRepository;
import org.springframework.stereotype.Service;
import com.toyapp.backend.model.ToyImage;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<OrderDTO> getAllOrders() {

        List<Order> orders = orderRepository.findAll();

        return convertToDTO(orders);

    }

    private List<OrderDTO> convertToDTO(List<Order> orders) {
        return orders.stream()
                .map(order -> convertToDTO(order, order.getUser().getName()))
                .collect(Collectors.toList());
    }


    public List<OrderDTO> getOrdersByUser() {
        String userEmail = UserService.getCurrentUserEmail()
                .orElseThrow(() -> new RuntimeException("Error: User is not authenticated."));

        List<Order> orders = orderRepository.findByUserEmail(userEmail);
        return convertToDTO(orders, userEmail);
    }

    public OrderDTO getOrderById(Long id) {
        String userEmail = UserService.getCurrentUserEmail()
                .orElseThrow(() -> new RuntimeException("Error: User is not authenticated."));

        Optional<Order> order = orderRepository.findById(id);
        if (order.isEmpty()) {
            throw new RuntimeException("Error: Order not found.");
        }

        return convertToDTO(order.get(), userEmail);
    }


    private List<OrderDTO> convertToDTO(List<Order> orders, String userName) {
        return orders.stream()
                .map(order -> convertToDTO(order, userName))
                .collect(Collectors.toList());
    }

    private OrderDTO convertToDTO(Order order, String userName) {
        return new OrderDTO(
                order.getId(),
                userName,
                order.getStatus(),
                order.getTotalPrice(),
                order.getOrderType(),
                order.getCreatedAt(),
                order.getUpdatedAt(),
                convertToOrderItemDTO(order.getOrderItems())
        );
    }

    private List<OrderItemDTO> convertToOrderItemDTO(List<OrderItem> orderItems) {
        return orderItems.stream()
                .map(this::convertToOrderItemDTO)
                .collect(Collectors.toList());
    }


    private OrderItemDTO convertToOrderItemDTO(OrderItem orderItem) {
        return new OrderItemDTO(
                orderItem.getId(),
                orderItem.getOrder().getId(),
                orderItem.getToy().getId(),
                orderItem.getQuantity(),
                orderItem.getPrice(),
                orderItem.getRentalDuration(),
                orderItem.getToy().getImages().stream()
                        .map(ToyImage::getImageUrl)
                        .toArray(String[]::new)
        );
    }
}




