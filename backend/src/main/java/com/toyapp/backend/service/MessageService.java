package com.toyapp.backend.service;

import com.toyapp.backend.dto.message.MessageDto;
import com.toyapp.backend.exception.ChatException;
import com.toyapp.backend.model.Message;
import com.toyapp.backend.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import java.util.List;

import java.time.Instant;
import java.time.LocalDateTime;

@Service
public class MessageService {

    private final SimpMessagingTemplate template;
    private final MessageRepository messageRepository;

    @Autowired
    public MessageService(SimpMessagingTemplate template, MessageRepository messageRepository) {
        this.template = template;
        this.messageRepository = messageRepository;
    }

    public void sendPrivateMessage(MessageDto messageDto) {
        if (messageDto.getSenderName() == null || messageDto.getReceiverName() == null || messageDto.getMessage() == null) {
            throw new ChatException("Invalid message data");
        }

        Message message = new Message();

        message.setSenderId(Long.parseLong(messageDto.getSenderName()));
        message.setReceiverId(Long.parseLong(messageDto.getReceiverName()));
        message.setMessage(messageDto.getMessage());
        message.setCreatedAt(Instant.now());

        messageRepository.save(message);

        template.convertAndSendToUser(messageDto.getReceiverName(), "/root", message);

    }
    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }
}
