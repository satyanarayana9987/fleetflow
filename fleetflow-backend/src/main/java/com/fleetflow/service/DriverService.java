package com.fleetflow.service;

import com.fleetflow.dto.DriverRequest;
import com.fleetflow.dto.DriverResponse;
import com.fleetflow.entity.Driver;
import com.fleetflow.entity.DriverStatus;
import com.fleetflow.exception.DuplicateResourceException;
import com.fleetflow.exception.ResourceNotFoundException;
import com.fleetflow.mapper.DriverMapper;
import com.fleetflow.repository.DriverRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DriverService {

    private final DriverRepository driverRepository;
    private final DriverMapper driverMapper;

    public List<DriverResponse> getAllDrivers() {
        return driverRepository.findAll().stream()
                .map(driverMapper::toResponse)
                .collect(Collectors.toList());
    }

    public DriverResponse getDriverById(Long id) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found with id: " + id));
        return driverMapper.toResponse(driver);
    }

    public List<DriverResponse> getAvailableDrivers() {
        return driverRepository.findByStatus(DriverStatus.AVAILABLE).stream()
                .map(driverMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public DriverResponse createDriver(DriverRequest request) {
        if (driverRepository.existsByLicenseNumber(request.getLicenseNumber())) {
            throw new DuplicateResourceException("Driver already exists with license number: " + request.getLicenseNumber());
        }

        Driver driver = Driver.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .licenseNumber(request.getLicenseNumber())
                .status(request.getStatus() != null ? request.getStatus() : DriverStatus.AVAILABLE)
                .currentLocation(request.getCurrentLocation() != null ? request.getCurrentLocation() : "Logistics Hub")
                .rating(request.getRating() != null ? request.getRating() : 5.0)
                .deliveries(request.getDeliveries() != null ? request.getDeliveries() : 0)
                .experience(request.getExperience() != null ? request.getExperience() : "3 years")
                .build();

        return driverMapper.toResponse(driverRepository.save(driver));
    }

    @Transactional
    public DriverResponse updateDriver(Long id, DriverRequest request) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found with id: " + id));

        driver.setName(request.getName());
        if (request.getEmail() != null) driver.setEmail(request.getEmail());
        if (request.getPhone() != null) driver.setPhone(request.getPhone());
        if (request.getStatus() != null) driver.setStatus(request.getStatus());
        if (request.getCurrentLocation() != null) driver.setCurrentLocation(request.getCurrentLocation());
        if (request.getRating() != null) driver.setRating(request.getRating());
        if (request.getDeliveries() != null) driver.setDeliveries(request.getDeliveries());

        return driverMapper.toResponse(driverRepository.save(driver));
    }

    @Transactional
    public void deleteDriver(Long id) {
        if (!driverRepository.existsById(id)) {
            throw new ResourceNotFoundException("Driver not found with id: " + id);
        }
        driverRepository.deleteById(id);
    }
}
