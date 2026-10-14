package com.fleetflow.mapper;

import com.fleetflow.dto.DriverResponse;
import com.fleetflow.entity.Driver;
import org.springframework.stereotype.Component;

@Component
public class DriverMapper {

    public DriverResponse toResponse(Driver driver) {
        if (driver == null) return null;
        return DriverResponse.builder()
                .id(driver.getId())
                .name(driver.getName())
                .email(driver.getEmail())
                .phone(driver.getPhone())
                .licenseNumber(driver.getLicenseNumber())
                .status(driver.getStatus())
                .currentLocation(driver.getCurrentLocation())
                .rating(driver.getRating())
                .deliveries(driver.getDeliveries())
                .experience(driver.getExperience())
                .createdAt(driver.getCreatedAt())
                .build();
    }
}
