package com.fleetflow.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KMPRequest {
    private String text;
    private String pattern;
}
