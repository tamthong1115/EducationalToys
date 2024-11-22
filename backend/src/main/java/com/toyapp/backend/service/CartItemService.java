package com.toyapp.backend.service;

import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import com.toyapp.backend.dto.cart.*;
import com.toyapp.backend.model.*;
import com.toyapp.backend.repository.CartItemRepository;
import com.toyapp.backend.repository.OrderItemRepository;
import com.toyapp.backend.repository.OrderRepository;
import com.toyapp.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class CartItemService {
    private final CartItemRepository cartItemRepository;
    private final CartService cartService;
    private final ToyService toyService;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final OrderItemRepository orderItemRepository;

    public CartItemService(CartItemRepository cartItemRepository, CartService cartService, ToyService toyService, OrderRepository orderRepository, UserRepository userRepository, OrderItemRepository orderItemRepository) {
        this.cartItemRepository = cartItemRepository;
        this.cartService = cartService;
        this.toyService = toyService;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.orderItemRepository = orderItemRepository;
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


    public StripePaymentResponseDTO createPaymentIntent(StripePaymentRequestDTO stripePaymentRequestDTO) {
        Long userId = UserService.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Error: User is not authenticated."));
        Cart cart = cartService.getCartByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Error: Cart is not found."));

        List<Long> cartItemIds = stripePaymentRequestDTO.getCartItemIds();
        List<CartItem> cartItems = cart.getCartItems().stream()
                .filter(cartItem -> cartItemIds.contains(cartItem.getId().longValue()))
                .toList();

        double totalPrice = cartItems.stream()
                .mapToDouble(cartItem -> cartItem.getToy().getPrice() * cartItem.getQuantity())
                .sum();


        Map<String, String> metadata = new HashMap<>();
        metadata.put("cartId", cart.getId().toString());
        metadata.put("userId", userId.toString());
        metadata.put("totalPrice", String.valueOf(totalPrice));
        metadata.put("cartItemIds", cartItemIds.stream()
                .map(Object::toString)
                .collect(Collectors.joining(",")));

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setCurrency("usd")
                .setAmount((long) (totalPrice * 100))
                .putAllMetadata(metadata)
                .build();

        PaymentIntent paymentIntent;
        try {
            paymentIntent = PaymentIntent.create(params);

        } catch (Exception e) {
            throw new RuntimeException("Error: Payment intent creation failed.");
        }

        StripePaymentResponseDTO stripePaymentResponseDTO = new StripePaymentResponseDTO();
        stripePaymentResponseDTO.setPaymentIntentId(paymentIntent.getId());
        stripePaymentResponseDTO.setClientSecret(paymentIntent.getClientSecret());
        stripePaymentResponseDTO.setTotalPrice(totalPrice);
        return stripePaymentResponseDTO;
    }


    public Order confirmPayment(RequestConfirmPaymentDTO requestConfirmPaymentDTO) {

        // retrieve the payment intent
        PaymentIntent paymentIntent;
        try {
            paymentIntent = PaymentIntent.retrieve(requestConfirmPaymentDTO.getPaymentIntentId());
        } catch (Exception e) {
            throw new RuntimeException("Error: Payment intent not found.");
        }
        System.out.println("paymentIntent_Metadata_userId: " + paymentIntent.getMetadata().get("userId"));
        System.out.println("requestConfirmPaymentDTO_userId: " + requestConfirmPaymentDTO.getUserId().toString());


        if (!paymentIntent.getMetadata().get("userId").equals(requestConfirmPaymentDTO.getUserId().toString())) {
            throw new RuntimeException("Error: User does not match the payment intent.");
        }


//        if (paymentIntent.getMetadata().get("cartId").equals(requestConfirmPaymentDTO.getCartId().toString())) {
//            throw new RuntimeException("Error: Cart does not match the payment intent.");
//        }


        // Check if the cart items match the payment intent
        List<Long> cartItemIds = Stream.of(paymentIntent.getMetadata().get("cartItemIds").split(","))
                .map(Long::parseLong)
                .toList();

        if (!new HashSet<>(cartItemIds).containsAll(requestConfirmPaymentDTO.getCartItemIds())) {
            throw new RuntimeException("Error: Cart items do not match the payment intent.");
        }

        if (!paymentIntent.getStatus().equals("succeeded")) {
            throw new RuntimeException("Error: Payment intent is not successful.");
        }

        List<CartItem> cartItems = cartItemRepository.findAllById(cartItemIds);

        User user = userRepository.findByEmail(UserService.getCurrentUserEmail().get())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setTotalPrice(new BigDecimal(paymentIntent.getMetadata().get("totalPrice")));
        order.setOrderType("SALE");
        order.setStatus("PAID");
        order.setUser(user);
        order.setOrderItems(cartItems.stream()
                .map(cartItem -> {
                    OrderItem orderItem = new OrderItem();
                    orderItem.setToy(cartItem.getToy());
                    orderItem.setQuantity(cartItem.getQuantity());
                    orderItem.setPrice(BigDecimal.valueOf(cartItem.getToy().getPrice()));
                    orderItem.setOrder(order);
                    return orderItem;
                })
                .toList());


        orderRepository.save(order);
        orderItemRepository.saveAll(order.getOrderItems());


        updateToyStock(cartItems);

        cartItemRepository.deleteAll(cartItems);

        return order;

    }

    private void updateToyStock(List<CartItem> cartItems) {
        for (CartItem cartItem : cartItems) {
            Toy toy = cartItem.getToy();
            toy.setStock(toy.getStock() - cartItem.getQuantity());
            toyService.saveToy(toy);
        }
    }
}
