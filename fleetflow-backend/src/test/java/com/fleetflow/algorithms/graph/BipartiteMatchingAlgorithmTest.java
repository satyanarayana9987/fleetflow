package com.fleetflow.algorithms.graph;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

class BipartiteMatchingAlgorithmTest {

    private BipartiteMatchingAlgorithm matchingAlgorithm;

    @BeforeEach
    void setUp() {
        matchingAlgorithm = new BipartiteMatchingAlgorithm();
    }

    @Test
    void testMaxBipartiteMatching() {
        List<String> drivers = Arrays.asList("Driver1", "Driver2");
        List<String> tasks = Arrays.asList("Task1", "Task2");

        Map<String, List<String>> compMap = new HashMap<>();
        compMap.put("Driver1", Arrays.asList("Task1", "Task2"));
        compMap.put("Driver2", Collections.singletonList("Task2"));

        Map<String, String> matchings = matchingAlgorithm.computeMaxBipartiteMatching(drivers, tasks, compMap);

        assertNotNull(matchings);
        assertEquals(2, matchings.size());
        assertTrue(matchings.containsKey("Driver1"));
        assertTrue(matchings.containsKey("Driver2"));
    }
}
