package com.toyapp.backend.service;

import com.toyapp.backend.dto.cart.CartItemDTO;
import com.toyapp.backend.dto.cart.CreateCartItemDTO;
import com.toyapp.backend.model.Cart;
import com.toyapp.backend.model.CartItem;
import com.toyapp.backend.model.Toy;
import com.toyapp.backend.model.ToyImage;
import com.toyapp.backend.repository.CartItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartItemService {
    private final CartItemRepository cartItemRepository;
    private final CartService cartService;
    private final ToyService toyService;

    public CartItemService(CartItemRepository cartItemRepository, CartService cartService, ToyService toyService) {
        this.cartItemRepository = cartItemRepository;
        this.cartService = cartService;
        this.toyService = toyService;
    }


    public CartItemDTO createCartItem(CreateCartItemDTO createCartItemDTO) {

        Long userId = UserService.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Error: User is not authenticated."));
        Cart cart = cartService.getCartByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Error: Cart is not found."));

        Toy toy = toyService.getToyById(createCartItemDTO.getToyId())
                .orElseThrow(() -> new RuntimeException("Error: Toy is not found."));

        // Check if the toy is already in the cart
        CartItem existingCartItem = cart.getCartItems().stream()
                .filter(cartItem -> cartItem.getToy().getId().equals(toy.getId()))
                .findFirst()
                .orElse(null);


        int newQuantity = createCartItemDTO.getQuantity();
        if (existingCartItem != null) {
            newQuantity += existingCartItem.getQuantity();
        }

        // Validate that the new quantity does not exceed the stock
        if (newQuantity > toy.getStock()) {
            throw new RuntimeException("Error: Quantity exceeds the available stock.");
        }

        if (existingCartItem != null) {
            existingCartItem.setQuantity(existingCartItem.getQuantity() + createCartItemDTO.getQuantity());
            cartItemRepository.save(existingCartItem);
            return mapToCartItemDTO(existingCartItem);
        } else {
            CartItem cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setToy(toy);
            cartItem.setQuantity(createCartItemDTO.getQuantity());
            cartItemRepository.save(cartItem);
            return mapToCartItemDTO(cartItem);
        }
    }

    @Transactional
    public CartItemDTO increaseQuantity(Long cartItemId, int quantity) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("CartItem not found"));

        if (cartItem.getQuantity() + quantity > cartItem.getToy().getStock()) {
            throw new RuntimeException("Error: Quantity is greater than the stock.");
        }

        cartItem.setQuantity(cartItem.getQuantity() + quantity);
        cartItemRepository.save(cartItem);
        return mapToCartItemDTO(cartItem);
    }

    @Transactional
    public CartItemDTO decreaseQuantity(Long cartItemId, int quantity) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("CartItem not found"));
        int newQuantity = cartItem.getQuantity() - quantity;
        if (newQuantity <= 0) {
            cartItemRepository.delete(cartItem);
            return null;
        } else {
            cartItem.setQuantity(newQuantity);
            cartItemRepository.save(cartItem);
            return mapToCartItemDTO(cartItem);
        }
    }


    @Transactional
    public CartItemDTO deleteCartItem(Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("CartItem not found"));

        cartItemRepository.delete(cartItem);
        return mapToCartItemDTO(cartItem);
    }

    private CartItemDTO mapToCartItemDTO(CartItem cartItem) {
        CartItemDTO cartItemDTO = new CartItemDTO();
        cartItemDTO.setId(Long.valueOf(cartItem.getId()));
        cartItemDTO.setToyId(cartItem.getToy().getId());
        cartItemDTO.setStock(cartItem.getToy().getStock());
        cartItemDTO.setQuantity(cartItem.getQuantity());
        cartItemDTO.setName(cartItem.getToy().getName());
        cartItemDTO.setDescription(cartItem.getToy().getDescription());
        cartItemDTO.setPrice(cartItem.getToy().getPrice());
        cartItemDTO.setTotalPrice(cartItem.getToy().getPrice() * cartItem.getQuantity());
        cartItemDTO.setImageUrls(cartItem.getToy().getImages().stream()
                .map(ToyImage::getImageUrl)
                .toArray(String[]::new));
        return cartItemDTO;
    }

    public List<CartItemDTO> getAllCartItems() {
        Long userId = UserService.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Error: User is not authenticated."));
        Cart cart = cartService.getCartByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Error: Cart is not found."));


        return cart.getCartItems().stream()
                .map(this::mapToCartItemDTO)
                .toList();
    }
}
