package com.toyapp.backend.model;

import java.time.LocalDateTime;

public class Message {
    private String sender;
    private String text;
    private LocalDateTime timestamp;

    // Getters và Setters
    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}