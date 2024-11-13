package com.toyapp.backend.controller;
import com.toyapp.backend.dto.message.MessageDto;
import com.toyapp.backend.model.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {
    private final SimpMessagingTemplate template;


    @MessageMapping("/private-message")
    public void recMessage(
            @Payload MessageDto message
    ){
        template.convertAndSendToUser(message.getReceiverName(), "/root", message);
    }
}
