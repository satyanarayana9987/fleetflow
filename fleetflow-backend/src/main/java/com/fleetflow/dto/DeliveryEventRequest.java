package com.fleetflow.dto;

import com.fleetflow.entity.EventType;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeliveryEventRequest {

    @NotNull(message = "Event type is required")
    private EventType eventType;

    private String step;
    private String location;
    private String description;
    private String timeFormatted;
    private Boolean completed;
    private Boolean currentStep;
}
