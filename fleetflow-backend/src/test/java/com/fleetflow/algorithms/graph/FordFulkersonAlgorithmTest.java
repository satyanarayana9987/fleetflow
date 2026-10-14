package com.fleetflow.algorithms.graph;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class FordFulkersonAlgorithmTest {

    private FordFulkersonAlgorithm fordFulkersonAlgorithm;

    @BeforeEach
    void setUp() {
        fordFulkersonAlgorithm = new FordFulkersonAlgorithm();
    }

    @Test
    void testMaxFlowComputation() {
        int[][] graph = {
                {0, 16, 13, 0, 0, 0},
                {0, 0, 10, 12, 0, 0},
                {0, 4, 0, 0, 14, 0},
                {0, 0, 9, 0, 0, 20},
                {0, 0, 0, 7, 0, 4},
                {0, 0, 0, 0, 0, 0}
        };

        int maxFlow = fordFulkersonAlgorithm.calculateMaxFlow(0, 5, graph);

        assertEquals(23, maxFlow);
    }
}
