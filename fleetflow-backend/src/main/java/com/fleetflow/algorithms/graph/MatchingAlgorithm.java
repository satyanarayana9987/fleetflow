package com.fleetflow.algorithms.graph;

import java.util.List;
import java.util.Map;

public interface MatchingAlgorithm {
    Map<String, String> computeMaxBipartiteMatching(List<String> drivers, List<String> tasks, Map<String, List<String>> compatibilityMap);
}
