package com.toyapp.backend.service;

import com.toyapp.backend.model.Cart;
import com.toyapp.backend.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }


    Optional<Cart> getCartByUserId(Long userId){
        return cartRepository.findByUserId(userId);
    }

}
