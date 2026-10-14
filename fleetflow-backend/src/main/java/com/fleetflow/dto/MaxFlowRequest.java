package com.fleetflow.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MaxFlowRequest {
    private String source;
    private String sink;
    private int nodesCount;
}
