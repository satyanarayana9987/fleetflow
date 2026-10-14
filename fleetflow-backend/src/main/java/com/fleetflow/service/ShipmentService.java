package com.fleetflow.service;

import com.fleetflow.dto.ShipmentRequest;
import com.fleetflow.dto.ShipmentResponse;
import com.fleetflow.dto.ShipmentStatusUpdateRequest;
import com.fleetflow.entity.*;
import com.fleetflow.exception.DuplicateResourceException;
import com.fleetflow.exception.ResourceNotFoundException;
import com.fleetflow.mapper.ShipmentMapper;
import com.fleetflow.repository.DriverRepository;
import com.fleetflow.repository.ShipmentRepository;
import com.fleetflow.repository.VehicleRepository;
import com.fleetflow.repository.WarehouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShipmentService {

    private final ShipmentRepository shipmentRepository;
    private final DriverRepository driverRepository;
    private final VehicleRepository vehicleRepository;
    private final WarehouseRepository warehouseRepository;
    private final ShipmentMapper shipmentMapper;

    public List<ShipmentResponse> getAllShipments() {
        return shipmentRepository.findAll().stream()
                .map(shipmentMapper::toResponse)
                .collect(Collectors.toList());
    }

    public ShipmentResponse getShipmentById(Long id) {
        Shipment shipment = shipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Shipment not found with id: " + id));
        return shipmentMapper.toResponse(shipment);
    }

    public ShipmentResponse getShipmentByTrackingNumber(String trackingNumber) {
        Shipment shipment = shipmentRepository.findByTrackingNumber(trackingNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Shipment not found with tracking number: " + trackingNumber));
        return shipmentMapper.toResponse(shipment);
    }

    public List<ShipmentResponse> getShipmentsByStatus(ShipmentStatus status) {
        return shipmentRepository.findByStatus(status).stream()
                .map(shipmentMapper::toResponse)
                .collect(Collectors.toList());
    }

    public List<ShipmentResponse> searchShipments(String query) {
        if (query == null || query.isBlank()) {
            return getAllShipments();
        }
        return shipmentRepository.searchShipments(query).stream()
                .map(shipmentMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ShipmentResponse createShipment(ShipmentRequest request) {
        String trackingNo = request.getTrackingNumber();
        if (trackingNo == null || trackingNo.isBlank()) {
            trackingNo = "SHP-2026-" + (100000 + new Random().nextInt(900000));
        }

        if (shipmentRepository.existsByTrackingNumber(trackingNo)) {
            throw new DuplicateResourceException("Shipment tracking number already exists: " + trackingNo);
        }

        Driver driver = null;
        if (request.getDriverId() != null) {
            driver = driverRepository.findById(request.getDriverId()).orElse(null);
        }

        Vehicle vehicle = null;
        if (request.getVehicleId() != null) {
            vehicle = vehicleRepository.findById(request.getVehicleId()).orElse(null);
        }

        Warehouse warehouse = null;
        if (request.getWarehouseId() != null) {
            warehouse = warehouseRepository.findById(request.getWarehouseId()).orElse(null);
        }

        Shipment shipment = Shipment.builder()
                .trackingNumber(trackingNo)
                .customerName(request.getCustomerName())
                .customerEmail(request.getCustomerEmail())
                .customerContact(request.getCustomerContact())
                .origin(request.getOrigin())
                .destination(request.getDestination())
                .destinationAddress(request.getDestinationAddress())
                .weight(request.getWeight() != null ? request.getWeight() : "450 kg")
                .weightKg(request.getWeightKg() != null ? request.getWeightKg() : 450.0)
                .packageType(request.getPackageType() != null ? request.getPackageType() : "Standard Parcel")
                .priority(request.getPriority() != null ? request.getPriority() : Priority.MEDIUM)
                .status(request.getStatus() != null ? request.getStatus() : ShipmentStatus.PENDING)
                .driver(driver)
                .vehicle(vehicle)
                .warehouse(warehouse)
                .currentLocation(request.getCurrentLocation() != null ? request.getCurrentLocation() : (request.getOrigin() + " Loading Bay"))
                .distanceKm(request.getDistanceKm() != null ? request.getDistanceKm() : 275.0)
                .eta(request.getEta() != null ? request.getEta() : "Today, 5:00 PM")
                .createdDate(LocalDate.now())
                .events(new ArrayList<>())
                .build();

        // Create default timeline events
        DeliveryEvent event1 = DeliveryEvent.builder()
                .shipment(shipment)
                .eventType(EventType.ORDER_CREATED)
                .step("Order Created")
                .location(shipment.getOrigin())
                .description("Shipment registered in FleetFlow Platform")
                .timeFormatted("Just now")
                .completed(true)
                .currentStep(true)
                .timestamp(LocalDateTime.now())
                .build();

        shipment.getEvents().add(event1);

        return shipmentMapper.toResponse(shipmentRepository.save(shipment));
    }

    @Transactional
    public ShipmentResponse updateShipment(Long id, ShipmentRequest request) {
        Shipment shipment = shipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Shipment not found with id: " + id));

        shipment.setCustomerName(request.getCustomerName());
        if (request.getCustomerEmail() != null) shipment.setCustomerEmail(request.getCustomerEmail());
        if (request.getOrigin() != null) shipment.setOrigin(request.getOrigin());
        if (request.getDestination() != null) shipment.setDestination(request.getDestination());
        if (request.getPriority() != null) shipment.setPriority(request.getPriority());
        if (request.getStatus() != null) shipment.setStatus(request.getStatus());

        if (request.getDriverId() != null) {
            Driver driver = driverRepository.findById(request.getDriverId()).orElse(null);
            shipment.setDriver(driver);
        }
        if (request.getVehicleId() != null) {
            Vehicle vehicle = vehicleRepository.findById(request.getVehicleId()).orElse(null);
            shipment.setVehicle(vehicle);
        }

        return shipmentMapper.toResponse(shipmentRepository.save(shipment));
    }

    @Transactional
    public ShipmentResponse updateShipmentStatus(Long id, ShipmentStatusUpdateRequest updateRequest) {
        Shipment shipment = shipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Shipment not found with id: " + id));

        shipment.setStatus(updateRequest.getStatus());
        if (updateRequest.getCurrentLocation() != null) {
            shipment.setCurrentLocation(updateRequest.getCurrentLocation());
        }

        // Add corresponding timeline event
        DeliveryEvent event = DeliveryEvent.builder()
                .shipment(shipment)
                .eventType(mapStatusToEventType(updateRequest.getStatus()))
                .step(updateRequest.getStatus().name())
                .location(shipment.getCurrentLocation())
                .description(updateRequest.getDescription() != null ? updateRequest.getDescription() : "Status updated to " + updateRequest.getStatus())
                .timeFormatted("Just now")
                .completed(true)
                .currentStep(true)
                .timestamp(LocalDateTime.now())
                .build();

        shipment.getEvents().add(event);

        return shipmentMapper.toResponse(shipmentRepository.save(shipment));
    }

    @Transactional
    public void deleteShipment(Long id) {
        if (!shipmentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Shipment not found with id: " + id);
        }
        shipmentRepository.deleteById(id);
    }

    private EventType mapStatusToEventType(ShipmentStatus status) {
        return switch (status) {
            case PENDING -> EventType.ORDER_CREATED;
            case PICKED_UP -> EventType.PICKED_UP;
            case IN_TRANSIT -> EventType.IN_TRANSIT;
            case OUT_FOR_DELIVERY -> EventType.OUT_FOR_DELIVERY;
            case DELIVERED -> EventType.DELIVERED;
            case DELAYED -> EventType.DELAYED;
            case CANCELLED -> EventType.CANCELLED;
        };
    }
}
