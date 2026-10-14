package com.fleetflow.dto;

import com.fleetflow.entity.DriverStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriverResponse {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String licenseNumber;
    private DriverStatus status;
    private String currentLocation;
    private Double rating;
    private Integer deliveries;
    private String experience;
    private LocalDateTime createdAt;
}
