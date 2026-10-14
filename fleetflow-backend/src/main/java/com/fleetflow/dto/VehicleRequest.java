package com.fleetflow.dto;

import com.fleetflow.entity.VehicleStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleRequest {

    @NotBlank(message = "Vehicle number is required")
    private String vehicleNumber;

    @NotBlank(message = "Vehicle type is required")
    private String type;

    private String capacity;
    private Double capacityKg;
    private Double currentLoadKg;
    private String fuelBattery;
    private VehicleStatus status;
    private String currentLocation;
    private String lastMaintenance;
}
