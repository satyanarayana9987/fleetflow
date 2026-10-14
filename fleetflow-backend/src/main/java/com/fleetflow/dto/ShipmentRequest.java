package com.fleetflow.dto;

import com.fleetflow.entity.Priority;
import com.fleetflow.entity.ShipmentStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShipmentRequest {

    private String trackingNumber;

    @NotBlank(message = "Customer name is required")
    private String customerName;

    private String customerEmail;
    private String customerContact;

    @NotBlank(message = "Origin is required")
    private String origin;

    @NotBlank(message = "Destination is required")
    private String destination;

    private String destinationAddress;
    private String weight;
    private Double weightKg;
    private String packageType;

    private Priority priority;
    private ShipmentStatus status;

    private Long driverId;
    private Long vehicleId;
    private Long warehouseId;

    private String currentLocation;
    private Double distanceKm;
    private String eta;
}
