package com.fleetflow.dto;

import lombok.*;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsSummaryResponse {

    private String range;
    private long totalShipments;
    private String avgDeliveryTime;
    private String onTimeRate;
    private String fleetUtil;
    private String whCapacity;
    private String driverUtil;
    private String avgDistance;
    private String delayedCount;

    private List<Map<String, Object>> volumeData;
    private List<Map<String, Object>> utilizationData;
}
