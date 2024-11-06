package com.toyapp.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")  // Tạo endpoint cho WebSocket
//                .setAllowedOrigins("http://localhost:5173")  // Cho phép frontend kết nối (React frontend chạy tại cổng 5173)
                .setAllowedOriginPatterns("*");
//
//        registry.addEndpoint("/chat")  // Tạo endpoint cho WebSocket
//                .setAllowedOrigins("http://localhost:5173")  // Cho phép frontend kết nối (React frontend chạy tại cổng 5173)
//                .withSockJS();  // Sử dụng SockJS dự phòng cho các trình duyệt không hỗ trợ WebSocket
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic","/user");  // Cấu hình broker với prefix là /topic
        registry.setApplicationDestinationPrefixes("/app");  // Prefix cho các message gửi từ client tới server
        registry.setUserDestinationPrefix("/user");
    }
}
