package com.fleetflow.dto;

import com.fleetflow.entity.DriverStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriverRequest {

    @NotBlank(message = "Driver name is required")
    private String name;

    private String email;
    private String phone;

    @NotBlank(message = "License number is required")
    private String licenseNumber;

    private DriverStatus status;
    private String currentLocation;
    private Double rating;
    private Integer deliveries;
    private String experience;
}
