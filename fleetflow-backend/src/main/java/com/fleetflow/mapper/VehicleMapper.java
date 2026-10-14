package com.fleetflow.mapper;

import com.fleetflow.dto.VehicleResponse;
import com.fleetflow.entity.Vehicle;
import org.springframework.stereotype.Component;

@Component
public class VehicleMapper {

    public VehicleResponse toResponse(Vehicle vehicle) {
        if (vehicle == null) return null;
        double loadPct = 0.0;
        if (vehicle.getCapacityKg() != null && vehicle.getCapacityKg() > 0 && vehicle.getCurrentLoadKg() != null) {
            loadPct = Math.round((vehicle.getCurrentLoadKg() / vehicle.getCapacityKg()) * 1000.0) / 10.0;
        }

        return VehicleResponse.builder()
                .id(vehicle.getId())
                .vehicleNumber(vehicle.getVehicleNumber())
                .type(vehicle.getType())
                .capacity(vehicle.getCapacity())
                .capacityKg(vehicle.getCapacityKg())
                .currentLoadKg(vehicle.getCurrentLoadKg())
                .loadPercentage(loadPct)
                .fuelBattery(vehicle.getFuelBattery())
                .status(vehicle.getStatus())
                .currentLocation(vehicle.getCurrentLocation())
                .lastMaintenance(vehicle.getLastMaintenance())
                .createdAt(vehicle.getCreatedAt())
                .build();
    }
}
