package com.fleetflow.dto;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LevenshteinResponse {
    private int distance;
    private String source;
    private String target;
    private List<String> operations;
    private String algorithm = "Levenshtein Distance";
    private String timeComplexity = "O(N * M)";
    private String spaceComplexity = "O(N * M)";
    private String log;
}
