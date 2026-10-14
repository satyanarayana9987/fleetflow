package com.fleetflow.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BloomFilterCheckResponse {

    private String trackingNumber;
    private Boolean possiblyExists;
    private String explanation;
    private int hashFunctionsCount;
    private String falsePositiveRate;
    private String algorithm = "Bloom Filter Probabilistic Data Structure";
    private String timeComplexity = "O(K)";
    private String log;
}
