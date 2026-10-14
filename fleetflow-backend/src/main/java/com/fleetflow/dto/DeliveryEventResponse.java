package com.fleetflow.dto;

import com.fleetflow.entity.EventType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeliveryEventResponse {

    private Long id;
    private EventType eventType;
    private String step;
    private String location;
    private String description;
    private String time;
    private Boolean completed;
    private Boolean current;
    private LocalDateTime timestamp;
}
