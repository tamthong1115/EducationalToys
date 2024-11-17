package com.toyapp.backend.controller.user;

import com.toyapp.backend.dto.cart.CartItemDTO;
import com.toyapp.backend.dto.cart.CreateCartItemDTO;
import com.toyapp.backend.service.CartItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user/cart")
public class CartController {

    private final CartItemService cartItemService;

    public CartController(CartItemService cartItemService) {
        this.cartItemService = cartItemService;
    }

    @GetMapping("/all")
    public List<CartItemDTO> getAllCartItems() {
        return cartItemService.getAllCartItems();
    }

    @PostMapping("/add")
    public CartItemDTO addToCart(@RequestBody CreateCartItemDTO createCartItemDTO) {
        return cartItemService.createCartItem(createCartItemDTO);
    }

    @PatchMapping("/increase")
    public CartItemDTO increaseCartItemQuantity(@RequestParam Long cartItemId, @RequestParam int quantity) {
        return cartItemService.increaseQuantity(cartItemId, quantity);
    }

    @PatchMapping("/decrease")
    public CartItemDTO decreaseCartItemQuantity(@RequestParam Long cartItemId, @RequestParam int quantity) {
        return cartItemService.decreaseQuantity(cartItemId, quantity);
    }

    @DeleteMapping("/remove/{cartItemId}")
    public CartItemDTO deleteCartItem(@PathVariable Long cartItemId) {
        return cartItemService.deleteCartItem(cartItemId);
    }

}
