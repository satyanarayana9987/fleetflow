package com.fleetflow.algorithms.graph;

import java.util.List;
import java.util.Map;

public interface ShortestPathAlgorithm {
    PathResult findShortestPath(String source, String destination, Map<String, Map<String, Double>> graph);

    class PathResult {
        private final List<String> path;
        private final double distance;

        public PathResult(List<String> path, double distance) {
            this.path = path;
            this.distance = distance;
        }

        public List<String> getPath() { return path; }
        public double getDistance() { return distance; }
    }
}
