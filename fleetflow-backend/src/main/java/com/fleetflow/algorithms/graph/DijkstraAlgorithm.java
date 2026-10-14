package com.fleetflow.algorithms.graph;

import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class DijkstraAlgorithm implements ShortestPathAlgorithm {

    @Override
    public PathResult findShortestPath(String source, String destination, Map<String, Map<String, Double>> graph) {
        if (graph == null || !graph.containsKey(source)) {
            return new PathResult(Collections.singletonList(source), 0.0);
        }

        Map<String, Double> distances = new HashMap<>();
        Map<String, String> previous = new HashMap<>();
        PriorityQueue<NodeDistance> pq = new PriorityQueue<>(Comparator.comparingDouble(NodeDistance::getDistance));
        Set<String> visited = new HashSet<>();

        for (String node : graph.keySet()) {
            distances.put(node, Double.MAX_VALUE);
        }
        distances.put(source, 0.0);
        pq.add(new NodeDistance(source, 0.0));

        while (!pq.isEmpty()) {
            NodeDistance current = pq.poll();
            String u = current.getNode();

            if (!visited.add(u)) continue;

            if (u.equals(destination)) break;

            Map<String, Double> neighbors = graph.get(u);
            if (neighbors != null) {
                for (Map.Entry<String, Double> entry : neighbors.entrySet()) {
                    String v = entry.getKey();
                    double weight = entry.getValue();

                    if (!visited.contains(v)) {
                        double newDist = distances.get(u) + weight;
                        if (newDist < distances.getOrDefault(v, Double.MAX_VALUE)) {
                            distances.put(v, newDist);
                            previous.put(v, u);
                            pq.add(new NodeDistance(v, newDist));
                        }
                    }
                }
            }
        }

        List<String> path = new ArrayList<>();
        String curr = destination;
        if (previous.containsKey(curr) || curr.equals(source)) {
            while (curr != null) {
                path.add(0, curr);
                curr = previous.get(curr);
            }
        } else {
            path.add(source);
            path.add(destination);
        }

        double totalDist = distances.getOrDefault(destination, 0.0);
        if (totalDist == Double.MAX_VALUE) totalDist = 0.0;

        return new PathResult(path, totalDist);
    }

    private static class NodeDistance {
        private final String node;
        private final double distance;

        public NodeDistance(String node, double distance) {
            this.node = node;
            this.distance = distance;
        }

        public String getNode() { return node; }
        public double getDistance() { return distance; }
    }
}
