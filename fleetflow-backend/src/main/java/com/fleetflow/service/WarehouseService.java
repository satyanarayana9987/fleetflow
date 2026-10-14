package com.fleetflow.service;

import com.fleetflow.dto.WarehouseRequest;
import com.fleetflow.dto.WarehouseResponse;
import com.fleetflow.entity.Warehouse;
import com.fleetflow.entity.WarehouseStatus;
import com.fleetflow.exception.ResourceNotFoundException;
import com.fleetflow.mapper.WarehouseMapper;
import com.fleetflow.repository.WarehouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WarehouseService {

    private final WarehouseRepository warehouseRepository;
    private final WarehouseMapper warehouseMapper;

    public List<WarehouseResponse> getAllWarehouses() {
        return warehouseRepository.findAll().stream()
                .map(warehouseMapper::toResponse)
                .collect(Collectors.toList());
    }

    public WarehouseResponse getWarehouseById(Long id) {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with id: " + id));
        return warehouseMapper.toResponse(warehouse);
    }

    @Transactional
    public WarehouseResponse createWarehouse(WarehouseRequest request) {
        Warehouse warehouse = Warehouse.builder()
                .name(request.getName())
                .location(request.getLocation() != null ? request.getLocation() : "Hyderabad")
                .address(request.getAddress() != null ? request.getAddress() : "Logistics Hub Address")
                .capacity(request.getCapacity() != null ? request.getCapacity() : 10000.0)
                .currentLoad(request.getCurrentLoad() != null ? request.getCurrentLoad() : 0.0)
                .status(request.getStatus() != null ? request.getStatus() : WarehouseStatus.HEALTHY)
                .manager(request.getManager() != null ? request.getManager() : "Manager Admin")
                .incomingCount(request.getIncomingCount() != null ? request.getIncomingCount() : 0)
                .outgoingCount(request.getOutgoingCount() != null ? request.getOutgoingCount() : 0)
                .build();

        return warehouseMapper.toResponse(warehouseRepository.save(warehouse));
    }

    @Transactional
    public WarehouseResponse updateWarehouse(Long id, WarehouseRequest request) {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with id: " + id));

        warehouse.setName(request.getName());
        if (request.getLocation() != null) warehouse.setLocation(request.getLocation());
        if (request.getAddress() != null) warehouse.setAddress(request.getAddress());
        if (request.getCapacity() != null) warehouse.setCapacity(request.getCapacity());
        if (request.getCurrentLoad() != null) warehouse.setCurrentLoad(request.getCurrentLoad());
        if (request.getStatus() != null) warehouse.setStatus(request.getStatus());
        if (request.getManager() != null) warehouse.setManager(request.getManager());
        if (request.getIncomingCount() != null) warehouse.setIncomingCount(request.getIncomingCount());
        if (request.getOutgoingCount() != null) warehouse.setOutgoingCount(request.getOutgoingCount());

        return warehouseMapper.toResponse(warehouseRepository.save(warehouse));
    }

    @Transactional
    public void deleteWarehouse(Long id) {
        if (!warehouseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Warehouse not found with id: " + id);
        }
        warehouseRepository.deleteById(id);
    }
}
