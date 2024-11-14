package com.toyapp.backend.dto.message;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageDto {
    private String senderName;
    private String receiverName;
    private String message;
}
