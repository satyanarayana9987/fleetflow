package com.fleetflow.controller;

import com.fleetflow.dto.RouteOptimizeRequest;
import com.fleetflow.dto.RouteOptimizeResponse;
import com.fleetflow.service.RouteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/routes")
@RequiredArgsConstructor
@Tag(name = "Routes", description = "Algorithmic route optimization and corridor path planning REST endpoints")
public class RouteController {

    private final RouteService routeService;

    @GetMapping
    @Operation(summary = "Get available logistics routes")
    public ResponseEntity<List<Map<String, Object>>> getRoutes() {
        return ResponseEntity.ok(routeService.getAvailableRoutes());
    }

    @PostMapping("/optimize")
    @Operation(summary = "Calculate optimal shortest route using Dijkstra algorithm")
    public ResponseEntity<RouteOptimizeResponse> optimizeRoute(@Valid @RequestBody RouteOptimizeRequest request) {
        return ResponseEntity.ok(routeService.optimizeRoute(request));
    }
}
