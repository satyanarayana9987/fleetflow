package com.fleetflow.dto;

import lombok.*;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatchingRequest {
    private Integer driversCount;
    private Integer tasksCount;
    private List<String> drivers;
    private List<String> tasks;
}
