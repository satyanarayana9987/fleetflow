package com.fleetflow.dto;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RouteOptimizeResponse {

    private String algorithm;
    private String source;
    private String destination;
    private List<String> recommendedRoute;
    private Double distanceKm;
    private String estimatedTime;
    private Integer numberOfStops;
    private String estimatedCost;
    private String fuelConsumption;
    private String co2SavedKg;
}
