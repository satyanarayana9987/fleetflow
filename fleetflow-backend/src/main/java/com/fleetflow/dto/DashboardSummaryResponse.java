package com.fleetflow.dto;

import lombok.*;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardSummaryResponse {

    private long totalShipments;
    private long pendingShipments;
    private long inTransit;
    private long delivered;
    private long delayed;
    private String activeVehicles;
    private String availableDrivers;
    private Map<String, Object> kpiMetrics;
    private List<ShipmentResponse> recentShipments;
}
