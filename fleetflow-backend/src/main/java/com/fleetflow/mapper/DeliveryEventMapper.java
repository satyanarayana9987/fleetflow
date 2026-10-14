package com.fleetflow.mapper;

import com.fleetflow.dto.DeliveryEventResponse;
import com.fleetflow.entity.DeliveryEvent;
import org.springframework.stereotype.Component;

@Component
public class DeliveryEventMapper {

    public DeliveryEventResponse toResponse(DeliveryEvent event) {
        if (event == null) return null;
        return DeliveryEventResponse.builder()
                .id(event.getId())
                .eventType(event.getEventType())
                .step(event.getStep() != null ? event.getStep() : (event.getEventType() != null ? event.getEventType().name() : ""))
                .location(event.getLocation())
                .description(event.getDescription())
                .time(event.getTimeFormatted() != null ? event.getTimeFormatted() : (event.getTimestamp() != null ? event.getTimestamp().toString() : ""))
                .completed(event.getCompleted())
                .current(event.getCurrentStep())
                .timestamp(event.getTimestamp())
                .build();
    }
}
