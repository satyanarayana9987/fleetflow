package com.fleetflow.dto;

import com.fleetflow.entity.WarehouseStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WarehouseResponse {

    private Long id;
    private String name;
    private String location;
    private String address;
    private Double capacity;
    private Double currentLoad;
    private Double availableSpace;
    private Double utilization;
    private WarehouseStatus status;
    private String manager;
    private Integer incomingCount;
    private Integer outgoingCount;
    private LocalDateTime createdAt;
}
