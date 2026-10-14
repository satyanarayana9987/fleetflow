package com.fleetflow.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BloomFilterCheckRequest {

    @NotBlank(message = "Tracking number / Query ID is required")
    private String trackingNumber;

    private String queryId;
}
