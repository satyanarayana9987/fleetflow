package com.fleetflow.algorithms.graph;

import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class BipartiteMatchingAlgorithm implements MatchingAlgorithm {

    @Override
    public Map<String, String> computeMaxBipartiteMatching(List<String> drivers, List<String> tasks, Map<String, List<String>> compatibilityMap) {
        Map<String, String> driverToTask = new LinkedHashMap<>();
        Map<String, String> taskToDriver = new HashMap<>();

        if (drivers == null || tasks == null || drivers.isEmpty() || tasks.isEmpty()) {
            return driverToTask;
        }

        for (String driver : drivers) {
            Set<String> visited = new HashSet<>();
            dfsMatch(driver, compatibilityMap, taskToDriver, visited);
        }

        for (Map.Entry<String, String> entry : taskToDriver.entrySet()) {
            driverToTask.put(entry.getValue(), entry.getKey());
        }

        return driverToTask;
    }

    private boolean dfsMatch(String driver, Map<String, List<String>> compatibilityMap, Map<String, String> taskToDriver, Set<String> visited) {
        List<String> compatibleTasks = compatibilityMap.get(driver);
        if (compatibleTasks == null) return false;

        for (String task : compatibleTasks) {
            if (!visited.contains(task)) {
                visited.add(task);

                if (!taskToDriver.containsKey(task) || dfsMatch(taskToDriver.get(task), compatibilityMap, taskToDriver, visited)) {
                    taskToDriver.put(task, driver);
                    return true;
                }
            }
        }
        return false;
    }
}
