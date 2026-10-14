package com.fleetflow.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "warehouses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Warehouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String location;
    private String address;

    private Double capacity;
    private Double currentLoad;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private WarehouseStatus status;

    private String manager;
    private Integer incomingCount;
    private Integer outgoingCount;

    private LocalDateTime createdAt;

    public Double getAvailableSpace() {
        if (capacity == null) return 0.0;
        double load = (currentLoad != null) ? currentLoad : 0.0;
        return Math.max(0.0, capacity - load);
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) status = WarehouseStatus.HEALTHY;
        if (currentLoad == null) currentLoad = 0.0;
        if (incomingCount == null) incomingCount = 0;
        if (outgoingCount == null) outgoingCount = 0;
    }
}
