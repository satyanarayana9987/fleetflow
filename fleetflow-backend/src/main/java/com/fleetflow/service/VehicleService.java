package com.fleetflow.service;

import com.fleetflow.dto.VehicleRequest;
import com.fleetflow.dto.VehicleResponse;
import com.fleetflow.entity.Vehicle;
import com.fleetflow.entity.VehicleStatus;
import com.fleetflow.exception.DuplicateResourceException;
import com.fleetflow.exception.ResourceNotFoundException;
import com.fleetflow.mapper.VehicleMapper;
import com.fleetflow.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;
    private final VehicleMapper vehicleMapper;

    public List<VehicleResponse> getAllVehicles() {
        return vehicleRepository.findAll().stream()
                .map(vehicleMapper::toResponse)
                .collect(Collectors.toList());
    }

    public VehicleResponse getVehicleById(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found with id: " + id));
        return vehicleMapper.toResponse(vehicle);
    }

    public List<VehicleResponse> getAvailableVehicles() {
        return vehicleRepository.findByStatus(VehicleStatus.AVAILABLE).stream()
                .map(vehicleMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public VehicleResponse createVehicle(VehicleRequest request) {
        if (vehicleRepository.existsByVehicleNumber(request.getVehicleNumber())) {
            throw new DuplicateResourceException("Vehicle already exists with number: " + request.getVehicleNumber());
        }

        Vehicle vehicle = Vehicle.builder()
                .vehicleNumber(request.getVehicleNumber())
                .type(request.getType())
                .capacity(request.getCapacity() != null ? request.getCapacity() : "10.0 Tons")
                .capacityKg(request.getCapacityKg() != null ? request.getCapacityKg() : 10000.0)
                .currentLoadKg(request.getCurrentLoadKg() != null ? request.getCurrentLoadKg() : 0.0)
                .fuelBattery(request.getFuelBattery() != null ? request.getFuelBattery() : "90% (Diesel)")
                .status(request.getStatus() != null ? request.getStatus() : VehicleStatus.AVAILABLE)
                .currentLocation(request.getCurrentLocation() != null ? request.getCurrentLocation() : "Central Depot")
                .lastMaintenance(request.getLastMaintenance() != null ? request.getLastMaintenance() : "2026-09-01")
                .build();

        return vehicleMapper.toResponse(vehicleRepository.save(vehicle));
    }

    @Transactional
    public VehicleResponse updateVehicle(Long id, VehicleRequest request) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found with id: " + id));

        vehicle.setVehicleNumber(request.getVehicleNumber());
        vehicle.setType(request.getType());
        if (request.getCapacity() != null) vehicle.setCapacity(request.getCapacity());
        if (request.getCapacityKg() != null) vehicle.setCapacityKg(request.getCapacityKg());
        if (request.getCurrentLoadKg() != null) vehicle.setCurrentLoadKg(request.getCurrentLoadKg());
        if (request.getFuelBattery() != null) vehicle.setFuelBattery(request.getFuelBattery());
        if (request.getStatus() != null) vehicle.setStatus(request.getStatus());
        if (request.getCurrentLocation() != null) vehicle.setCurrentLocation(request.getCurrentLocation());

        return vehicleMapper.toResponse(vehicleRepository.save(vehicle));
    }

    @Transactional
    public void deleteVehicle(Long id) {
        if (!vehicleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Vehicle not found with id: " + id);
        }
        vehicleRepository.deleteById(id);
    }
}
