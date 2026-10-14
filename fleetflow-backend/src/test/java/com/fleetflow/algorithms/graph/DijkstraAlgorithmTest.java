package com.fleetflow.algorithms.graph;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

class DijkstraAlgorithmTest {

    private DijkstraAlgorithm dijkstraAlgorithm;

    @BeforeEach
    void setUp() {
        dijkstraAlgorithm = new DijkstraAlgorithm();
    }

    @Test
    void testShortestPathCalculation() {
        Map<String, Map<String, Double>> graph = new HashMap<>();

        Map<String, Double> hyd = new HashMap<>();
        hyd.put("Suryapet", 130.0);
        hyd.put("DirectVja", 300.0);
        graph.put("Hyderabad", hyd);

        Map<String, Double> suryapet = new HashMap<>();
        suryapet.put("Vijayawada", 140.0);
        graph.put("Suryapet", suryapet);

        ShortestPathAlgorithm.PathResult result = dijkstraAlgorithm.findShortestPath("Hyderabad", "Vijayawada", graph);

        assertNotNull(result);
        assertEquals(270.0, result.getDistance());
        assertEquals(Arrays.asList("Hyderabad", "Suryapet", "Vijayawada"), result.getPath());
    }
}
