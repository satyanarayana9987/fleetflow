package com.fleetflow.algorithms.graph;

import org.springframework.stereotype.Component;

@Component
public class FordFulkersonAlgorithm implements FlowAlgorithm {

    @Override
    public int calculateMaxFlow(int source, int sink, int[][] capacityGraph) {
        if (capacityGraph == null || capacityGraph.length == 0) return 0;
        int n = capacityGraph.length;

        int[][] rGraph = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                rGraph[i][j] = capacityGraph[i][j];
            }
        }

        int[] parent = new int[n];
        int maxFlow = 0;

        while (dfs(rGraph, source, sink, parent, new boolean[n])) {
            int pathFlow = Integer.MAX_VALUE;
            for (int v = sink; v != source; v = parent[v]) {
                int u = parent[v];
                pathFlow = Math.min(pathFlow, rGraph[u][v]);
            }

            for (int v = sink; v != source; v = parent[v]) {
                int u = parent[v];
                rGraph[u][v] -= pathFlow;
                rGraph[v][u] += pathFlow;
            }

            maxFlow += pathFlow;
        }

        return maxFlow;
    }

    private boolean dfs(int[][] rGraph, int u, int t, int[] parent, boolean[] visited) {
        if (u == t) return true;
        visited[u] = true;

        for (int v = 0; v < rGraph.length; v++) {
            if (!visited[v] && rGraph[u][v] > 0) {
                parent[v] = u;
                if (dfs(rGraph, v, t, parent, visited)) {
                    return true;
                }
            }
        }
        return false;
    }
}
