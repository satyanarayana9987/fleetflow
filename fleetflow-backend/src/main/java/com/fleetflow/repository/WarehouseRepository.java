package com.fleetflow.repository;

import com.fleetflow.entity.Warehouse;
import com.fleetflow.entity.WarehouseStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
    List<Warehouse> findByLocationContainingIgnoreCase(String location);
    List<Warehouse> findByStatus(WarehouseStatus status);
}
