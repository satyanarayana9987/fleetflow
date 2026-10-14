package com.fleetflow.mapper;

import com.fleetflow.dto.WarehouseResponse;
import com.fleetflow.entity.Warehouse;
import org.springframework.stereotype.Component;

@Component
public class WarehouseMapper {

    public WarehouseResponse toResponse(Warehouse warehouse) {
        if (warehouse == null) return null;
        double util = 0.0;
        if (warehouse.getCapacity() != null && warehouse.getCapacity() > 0 && warehouse.getCurrentLoad() != null) {
            util = Math.round((warehouse.getCurrentLoad() / warehouse.getCapacity()) * 1000.0) / 10.0;
        }

        return WarehouseResponse.builder()
                .id(warehouse.getId())
                .name(warehouse.getName())
                .location(warehouse.getLocation())
                .address(warehouse.getAddress())
                .capacity(warehouse.getCapacity())
                .currentLoad(warehouse.getCurrentLoad())
                .availableSpace(warehouse.getAvailableSpace())
                .utilization(util)
                .status(warehouse.getStatus())
                .manager(warehouse.getManager())
                .incomingCount(warehouse.getIncomingCount())
                .outgoingCount(warehouse.getOutgoingCount())
                .createdAt(warehouse.getCreatedAt())
                .build();
    }
}
