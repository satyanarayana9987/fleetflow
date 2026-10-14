package com.fleetflow.dto;

import com.fleetflow.entity.VehicleStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleResponse {

    private Long id;
    private String vehicleNumber;
    private String type;
    private String capacity;
    private Double capacityKg;
    private Double currentLoadKg;
    private Double loadPercentage;
    private String fuelBattery;
    private VehicleStatus status;
    private String currentLocation;
    private String lastMaintenance;
    private LocalDateTime createdAt;
}
