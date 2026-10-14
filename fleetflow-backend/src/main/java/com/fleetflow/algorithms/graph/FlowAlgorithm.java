package com.fleetflow.algorithms.graph;

import java.util.Map;

public interface FlowAlgorithm {
    int calculateMaxFlow(int source, int sink, int[][] capacityGraph);
}
