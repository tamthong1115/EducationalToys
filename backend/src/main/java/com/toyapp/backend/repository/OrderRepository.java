package com.toyapp.backend.repository;

import com.toyapp.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    Optional<Order> findById(Long id);

    Optional<Order> findByUserName(String userName);

    List<Order> findByUserEmail(String userEmail);
}
