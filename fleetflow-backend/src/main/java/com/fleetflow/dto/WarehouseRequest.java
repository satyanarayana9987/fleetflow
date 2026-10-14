package com.fleetflow.dto;

import com.fleetflow.entity.WarehouseStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WarehouseRequest {

    @NotBlank(message = "Warehouse name is required")
    private String name;

    private String location;
    private String address;
    private Double capacity;
    private Double currentLoad;
    private WarehouseStatus status;
    private String manager;
    private Integer incomingCount;
    private Integer outgoingCount;
}
