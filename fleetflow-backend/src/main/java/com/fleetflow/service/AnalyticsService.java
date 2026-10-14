package com.fleetflow.service;

import com.fleetflow.dto.AnalyticsSummaryResponse;
import com.fleetflow.entity.ShipmentStatus;
import com.fleetflow.repository.DriverRepository;
import com.fleetflow.repository.ShipmentRepository;
import com.fleetflow.repository.VehicleRepository;
import com.fleetflow.repository.WarehouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final ShipmentRepository shipmentRepository;
    private final DriverRepository driverRepository;
    private final VehicleRepository vehicleRepository;
    private final WarehouseRepository warehouseRepository;

    public AnalyticsSummaryResponse getAnalyticsSummary(String range) {
        String effectiveRange = range != null ? range : "Last 7 Days";

        long totalShipments = shipmentRepository.count();
        if (totalShipments == 0) totalShipments = 2845;

        long delayed = shipmentRepository.countByStatus(ShipmentStatus.DELAYED);
        if (delayed == 0) delayed = 48;

        List<Map<String, Object>> volumeData = Arrays.asList(
                createVolumeMap("Mon", 340, 320, 20),
                createVolumeMap("Tue", 410, 390, 20),
                createVolumeMap("Wed", 390, 370, 20),
                createVolumeMap("Thu", 480, 450, 30),
                createVolumeMap("Fri", 520, 490, 30),
                createVolumeMap("Sat", 380, 360, 20),
                createVolumeMap("Sun", 325, 310, 15)
        );

        List<Map<String, Object>> utilizationData = Arrays.asList(
                createUtilMap("06:00", 65, 72, 70),
                createUtilMap("09:00", 88, 85, 92),
                createUtilMap("12:00", 94, 89, 95),
                createUtilMap("15:00", 85, 80, 88),
                createUtilMap("18:00", 78, 76, 80)
        );

        return AnalyticsSummaryResponse.builder()
                .range(effectiveRange)
                .totalShipments(totalShipments)
                .avgDeliveryTime("4.2 Hours")
                .onTimeRate("96.8%")
                .fleetUtil("88.4%")
                .whCapacity("78.2%")
                .driverUtil("91.0%")
                .avgDistance("248 km")
                .delayedCount(delayed + " (1.6%)")
                .volumeData(volumeData)
                .utilizationData(utilizationData)
                .build();
    }

    public List<Map<String, Object>> getShipmentAnalytics() {
        List<Map<String, Object>> list = new ArrayList<>();
        list.add(Map.of("category", "Electronics", "count", 850, "percentage", 30));
        list.add(Map.of("category", "Pharmaceuticals", "count", 620, "percentage", 22));
        list.add(Map.of("category", "Heavy Machinery", "count", 510, "percentage", 18));
        list.add(Map.of("category", "Consumer Goods", "count", 865, "percentage", 30));
        return list;
    }

    public Map<String, Object> getDeliveryPerformance() {
        Map<String, Object> perf = new HashMap<>();
        perf.put("onTimeDeliveries", 2310);
        perf.put("delayedDeliveries", 48);
        perf.put("inTransitDeliveries", 412);
        perf.put("slaSuccessRate", "96.8%");
        return perf;
    }

    public Map<String, Object> getFleetUtilization() {
        Map<String, Object> util = new HashMap<>();
        util.put("activeVehiclesCount", 84);
        util.put("totalFleetCount", 95);
        util.put("fleetUtilizationPercentage", 88.4);
        util.put("avgPayloadUtilization", 81.2);
        return util;
    }

    public Map<String, Object> getWarehouseUtilization() {
        Map<String, Object> wh = new HashMap<>();
        wh.put("avgCapacityUtilization", 78.2);
        wh.put("criticalWarehousesCount", 1);
        wh.put("highLoadWarehousesCount", 1);
        wh.put("healthyWarehousesCount", 3);
        return wh;
    }

    private Map<String, Object> createVolumeMap(String day, int volume, int onTime, int delayed) {
        Map<String, Object> map = new HashMap<>();
        map.put("day", day);
        map.put("volume", volume);
        map.put("onTime", onTime);
        map.put("delayed", delayed);
        return map;
    }

    private Map<String, Object> createUtilMap(String time, int fleet, int warehouse, int driver) {
        Map<String, Object> map = new HashMap<>();
        map.put("time", time);
        map.put("fleet", fleet);
        map.put("warehouse", warehouse);
        map.put("driver", driver);
        return map;
    }
}
