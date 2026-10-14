package com.fleetflow.controller;

import com.fleetflow.dto.DeliveryEventRequest;
import com.fleetflow.dto.DeliveryEventResponse;
import com.fleetflow.service.DeliveryEventService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shipments/{shipmentId}/events")
@RequiredArgsConstructor
@Tag(name = "Delivery Events", description = "Shipment tracking timeline event REST endpoints")
public class DeliveryEventController {

    private final DeliveryEventService deliveryEventService;

    @GetMapping
    @Operation(summary = "Get tracking timeline events for shipment")
    public ResponseEntity<List<DeliveryEventResponse>> getEventsForShipment(@PathVariable Long shipmentId) {
        return ResponseEntity.ok(deliveryEventService.getEventsForShipment(shipmentId));
    }

    @PostMapping
    @Operation(summary = "Append tracking event to shipment timeline")
    public ResponseEntity<DeliveryEventResponse> addEventToShipment(
            @PathVariable Long shipmentId,
            @Valid @RequestBody DeliveryEventRequest request) {
        return new ResponseEntity<>(deliveryEventService.addEventToShipment(shipmentId, request), HttpStatus.CREATED);
    }
}
