package com.fleetflow.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LevenshteinRequest {
    private String source;
    private String target;
    private String str1;
    private String str2;
}
