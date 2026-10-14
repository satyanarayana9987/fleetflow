package com.fleetflow.controller;

import com.fleetflow.dto.AnalyticsSummaryResponse;
import com.fleetflow.service.AnalyticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
@Tag(name = "Analytics", description = "Logistics analytics, delivery performance, and resource utilization REST endpoints")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/summary")
    @Operation(summary = "Get overall analytics summary")
    public ResponseEntity<AnalyticsSummaryResponse> getAnalyticsSummary(
            @RequestParam(name = "range", required = false, defaultValue = "Last 7 Days") String range) {
        return ResponseEntity.ok(analyticsService.getAnalyticsSummary(range));
    }

    @GetMapping("/shipments")
    @Operation(summary = "Get shipment volume breakdown")
    public ResponseEntity<List<Map<String, Object>>> getShipmentAnalytics() {
        return ResponseEntity.ok(analyticsService.getShipmentAnalytics());
    }

    @GetMapping("/delivery-performance")
    @Operation(summary = "Get delivery SLA performance metrics")
    public ResponseEntity<Map<String, Object>> getDeliveryPerformance() {
        return ResponseEntity.ok(analyticsService.getDeliveryPerformance());
    }

    @GetMapping("/fleet-utilization")
    @Operation(summary = "Get fleet vehicles utilization stats")
    public ResponseEntity<Map<String, Object>> getFleetUtilization() {
        return ResponseEntity.ok(analyticsService.getFleetUtilization());
    }

    @GetMapping("/warehouse-utilization")
    @Operation(summary = "Get warehouse capacity utilization stats")
    public ResponseEntity<Map<String, Object>> getWarehouseUtilization() {
        return ResponseEntity.ok(analyticsService.getWarehouseUtilization());
    }
}
