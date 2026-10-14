package com.fleetflow.dto;

import com.fleetflow.entity.Priority;
import com.fleetflow.entity.ShipmentStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShipmentResponse {

    private Long id;
    private String trackingNumber;

    private String customerName;
    private String customerEmail;
    private String customerContact;

    private String origin;
    private String destination;
    private String destinationAddress;

    private String weight;
    private Double weightKg;
    private String packageType;

    private Priority priority;
    private ShipmentStatus status;

    private String driverName;
    private Long driverId;
    private String vehicleNumber;
    private Long vehicleId;
    private String warehouseName;
    private Long warehouseId;

    private String currentLocation;
    private Double distanceKm;
    private String eta;

    private LocalDate createdDate;
    private LocalDateTime createdAt;
    private LocalDateTime estimatedDelivery;

    private List<DeliveryEventResponse> timeline;
}
