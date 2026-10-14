package com.fleetflow.dto;

import lombok.*;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DijkstraRequest {
    private String source;
    private String destination;
    private List<String> nodes;
    private List<Map<String, Object>> edges;
}
