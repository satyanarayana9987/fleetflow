package com.fleetflow.mapper;

import com.fleetflow.dto.DeliveryEventResponse;
import com.fleetflow.dto.ShipmentResponse;
import com.fleetflow.entity.Shipment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ShipmentMapper {

    private final DeliveryEventMapper deliveryEventMapper;

    public ShipmentResponse toResponse(Shipment shipment) {
        if (shipment == null) return null;

        List<DeliveryEventResponse> eventResponses = Collections.emptyList();
        if (shipment.getEvents() != null) {
            eventResponses = shipment.getEvents().stream()
                    .map(deliveryEventMapper::toResponse)
                    .collect(Collectors.toList());
        }

        return ShipmentResponse.builder()
                .id(shipment.getId())
                .trackingNumber(shipment.getTrackingNumber())
                .customerName(shipment.getCustomerName())
                .customerEmail(shipment.getCustomerEmail())
                .customerContact(shipment.getCustomerContact())
                .origin(shipment.getOrigin())
                .destination(shipment.getDestination())
                .destinationAddress(shipment.getDestinationAddress())
                .weight(shipment.getWeight())
                .weightKg(shipment.getWeightKg())
                .packageType(shipment.getPackageType())
                .priority(shipment.getPriority())
                .status(shipment.getStatus())
                .driverId(shipment.getDriver() != null ? shipment.getDriver().getId() : null)
                .driverName(shipment.getDriver() != null ? shipment.getDriver().getName() : "Unassigned")
                .vehicleId(shipment.getVehicle() != null ? shipment.getVehicle().getId() : null)
                .vehicleNumber(shipment.getVehicle() != null ? shipment.getVehicle().getVehicleNumber() : "Unassigned")
                .warehouseId(shipment.getWarehouse() != null ? shipment.getWarehouse().getId() : null)
                .warehouseName(shipment.getWarehouse() != null ? shipment.getWarehouse().getName() : "Unassigned")
                .currentLocation(shipment.getCurrentLocation())
                .distanceKm(shipment.getDistanceKm())
                .eta(shipment.getEta())
                .createdDate(shipment.getCreatedDate())
                .createdAt(shipment.getCreatedAt())
                .estimatedDelivery(shipment.getEstimatedDelivery())
                .timeline(eventResponses)
                .build();
    }
}
