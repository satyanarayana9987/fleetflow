package com.fleetflow.dto;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DijkstraResponse {
    private String source;
    private String destination;
    private List<String> shortestPath;
    private Double distance;
    private String estimatedTime;
    private String algorithm = "Dijkstra Shortest Path";
    private String timeComplexity = "O((V + E) log V)";
    private String spaceComplexity = "O(V)";
    private String log;
}
