package com.fleetflow.repository;

import com.fleetflow.entity.Driver;
import com.fleetflow.entity.DriverStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {
    Optional<Driver> findByLicenseNumber(String licenseNumber);
    Boolean existsByLicenseNumber(String licenseNumber);
    List<Driver> findByStatus(DriverStatus status);
    List<Driver> findByNameContainingIgnoreCase(String name);
    long countByStatus(DriverStatus status);
}
