package com.fleetflow.dto;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KMPResponse {
    private Boolean found;
    private List<Integer> positions;
    private int matchCount;
    private int[] lpsArray;
    private String algorithm = "Knuth-Morris-Pratt (KMP)";
    private String timeComplexity = "O(N + M)";
    private String spaceComplexity = "O(M)";
    private String log;
}
