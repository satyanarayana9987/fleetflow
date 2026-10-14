package com.fleetflow.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MaxFlowResponse {
    private String source;
    private String sink;
    private String maxFlow;
    private int maxFlowValue;
    private String bottleneckEdge;
    private int augmentingPaths;
    private String algorithm = "Ford-Fulkerson Network Flow";
    private String timeComplexity = "O(E * MaxFlow)";
    private String spaceComplexity = "O(V + E)";
    private String log;
}
