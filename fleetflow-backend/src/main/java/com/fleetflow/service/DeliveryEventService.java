package com.fleetflow.service;

import com.fleetflow.dto.DeliveryEventRequest;
import com.fleetflow.dto.DeliveryEventResponse;
import com.fleetflow.entity.DeliveryEvent;
import com.fleetflow.entity.Shipment;
import com.fleetflow.exception.ResourceNotFoundException;
import com.fleetflow.mapper.DeliveryEventMapper;
import com.fleetflow.repository.DeliveryEventRepository;
import com.fleetflow.repository.ShipmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DeliveryEventService {

    private final DeliveryEventRepository deliveryEventRepository;
    private final ShipmentRepository shipmentRepository;
    private final DeliveryEventMapper deliveryEventMapper;

    public List<DeliveryEventResponse> getEventsForShipment(Long shipmentId) {
        if (!shipmentRepository.existsById(shipmentId)) {
            throw new ResourceNotFoundException("Shipment not found with id: " + shipmentId);
        }
        return deliveryEventRepository.findByShipmentIdOrderByIdAsc(shipmentId).stream()
                .map(deliveryEventMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public DeliveryEventResponse addEventToShipment(Long shipmentId, DeliveryEventRequest request) {
        Shipment shipment = shipmentRepository.findById(shipmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Shipment not found with id: " + shipmentId));

        DeliveryEvent event = DeliveryEvent.builder()
                .shipment(shipment)
                .eventType(request.getEventType())
                .step(request.getStep() != null ? request.getStep() : request.getEventType().name())
                .location(request.getLocation() != null ? request.getLocation() : shipment.getCurrentLocation())
                .description(request.getDescription())
                .timeFormatted(request.getTimeFormatted() != null ? request.getTimeFormatted() : "Just now")
                .completed(request.getCompleted() != null ? request.getCompleted() : true)
                .currentStep(request.getCurrentStep() != null ? request.getCurrentStep() : true)
                .timestamp(LocalDateTime.now())
                .build();

        DeliveryEvent saved = deliveryEventRepository.save(event);
        return deliveryEventMapper.toResponse(saved);
    }
}
