package com.fleetflow.dto;

import lombok.*;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatchingResponse {
    private String status;
    private List<Map<String, Object>> matchings;
    private int matchedCount;
    private int totalDrivers;
    private String algorithm = "Bipartite Matching (Hopcroft-Karp)";
    private String timeComplexity = "O(E * sqrt(V))";
    private String spaceComplexity = "O(V + E)";
    private String log;
}
