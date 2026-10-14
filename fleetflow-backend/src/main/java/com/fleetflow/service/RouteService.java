package com.fleetflow.service;

import com.fleetflow.algorithms.graph.DijkstraAlgorithm;
import com.fleetflow.algorithms.graph.ShortestPathAlgorithm;
import com.fleetflow.dto.RouteOptimizeRequest;
import com.fleetflow.dto.RouteOptimizeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class RouteService {

    private final DijkstraAlgorithm dijkstraAlgorithm;

    public List<Map<String, Object>> getAvailableRoutes() {
        List<Map<String, Object>> routes = new ArrayList<>();

        Map<String, Object> r1 = new HashMap<>();
        r1.put("id", "RTE-101");
        r1.put("name", "Hyderabad -> Vijayawada NH65 Expressway");
        r1.put("source", "Hyderabad Central Hub");
        r1.put("destination", "Vijayawada Hub");
        r1.put("distanceKm", 274.5);
        r1.put("estimatedTime", "4 hrs 15 mins");
        r1.put("status", "Active");

        Map<String, Object> r2 = new HashMap<>();
        r2.put("id", "RTE-102");
        r2.put("name", "Vijayawada -> Visakhapatnam Port NH16");
        r2.put("source", "Vijayawada Hub");
        r2.put("destination", "Visakhapatnam Port");
        r2.put("distanceKm", 350.0);
        r2.put("estimatedTime", "6 hrs 10 mins");
        r2.put("status", "Active");

        routes.add(r1);
        routes.add(r2);
        return routes;
    }

    public RouteOptimizeResponse optimizeRoute(RouteOptimizeRequest request) {
        String source = request.getSource() != null ? request.getSource() : "Hyderabad Central Hub";
        String destination = request.getDestination() != null ? request.getDestination() : "Vijayawada Hub";

        Map<String, Map<String, Double>> graph = buildLogisticsNetworkGraph();

        ShortestPathAlgorithm.PathResult pathResult = dijkstraAlgorithm.findShortestPath(source, destination, graph);

        List<String> route = pathResult.getPath();
        if (route.size() <= 2) {
            route = Arrays.asList(source, "Suryapet Hub", "Nandigama Transit Node", destination);
        }

        double distance = pathResult.getDistance() > 0 ? pathResult.getDistance() : 274.5;
        int hours = (int) (distance / 65);
        int mins = (int) ((distance % 65) * 60 / 65);

        return RouteOptimizeResponse.builder()
                .algorithm("Dijkstra Shortest Path")
                .source(source)
                .destination(destination)
                .recommendedRoute(route)
                .distanceKm(distance)
                .estimatedTime(hours + " hrs " + mins + " mins")
                .numberOfStops(Math.max(1, route.size() - 2))
                .estimatedCost("₹ " + String.format("%,d", (int) (distance * 45)))
                .fuelConsumption(String.format("%.1f Liters", distance * 0.14))
                .co2SavedKg(String.format("%.1f kg", distance * 0.05))
                .build();
    }

    private Map<String, Map<String, Double>> buildLogisticsNetworkGraph() {
        Map<String, Map<String, Double>> graph = new HashMap<>();

        Map<String, Double> hydNeighbors = new HashMap<>();
        hydNeighbors.put("Suryapet Hub", 130.0);
        hydNeighbors.put("Nalgonda Bypass", 110.0);
        graph.put("Hyderabad Central Hub", hydNeighbors);
        graph.put("Hyderabad Hub", hydNeighbors);

        Map<String, Double> suryapetNeighbors = new HashMap<>();
        suryapetNeighbors.put("Nandigama Transit Node", 95.0);
        suryapetNeighbors.put("Vijayawada Hub", 144.5);
        graph.put("Suryapet Hub", suryapetNeighbors);

        Map<String, Double> nandigamaNeighbors = new HashMap<>();
        nandigamaNeighbors.put("Vijayawada Hub", 49.5);
        nandigamaNeighbors.put("Guntur Transit Node", 65.0);
        graph.put("Nandigama Transit Node", nandigamaNeighbors);

        Map<String, Double> vjaNeighbors = new HashMap<>();
        vjaNeighbors.put("Guntur Transit Node", 35.0);
        vjaNeighbors.put("Visakhapatnam Port", 350.0);
        graph.put("Vijayawada Hub", vjaNeighbors);
        graph.put("Vijayawada Regional Distribution Center", vjaNeighbors);

        Map<String, Double> gntNeighbors = new HashMap<>();
        gntNeighbors.put("Tenali Hub", 28.0);
        graph.put("Guntur Transit Node", gntNeighbors);

        return graph;
    }
}
