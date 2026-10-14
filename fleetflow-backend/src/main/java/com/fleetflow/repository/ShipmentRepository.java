package com.fleetflow.repository;

import com.fleetflow.entity.Shipment;
import com.fleetflow.entity.ShipmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
    Optional<Shipment> findByTrackingNumber(String trackingNumber);
    Boolean existsByTrackingNumber(String trackingNumber);
    List<Shipment> findByStatus(ShipmentStatus status);
    List<Shipment> findByDestinationContainingIgnoreCase(String destination);
    List<Shipment> findByCustomerEmail(String customerEmail);

    @Query("SELECT s FROM Shipment s WHERE " +
           "LOWER(s.trackingNumber) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(s.customerName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(s.destination) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Shipment> searchShipments(@Param("query") String query);

    long countByStatus(ShipmentStatus status);
}
