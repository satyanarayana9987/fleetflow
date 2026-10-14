package com.fleetflow.config;

import com.fleetflow.entity.*;
import com.fleetflow.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final DriverRepository driverRepository;
    private final VehicleRepository vehicleRepository;
    private final WarehouseRepository warehouseRepository;
    private final ShipmentRepository shipmentRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            seedUsers();
        }

        if (driverRepository.count() == 0) {
            seedDrivers();
        }

        if (vehicleRepository.count() == 0) {
            seedVehicles();
        }

        if (warehouseRepository.count() == 0) {
            seedWarehouses();
        }

        if (shipmentRepository.count() == 0) {
            seedShipments();
        }
    }

    private void seedUsers() {
        User admin = User.builder()
                .name("System Admin")
                .email("admin@fleetflow.logistics.io")
                .password(passwordEncoder.encode("Password@123"))
                .phone("+91 98765 00000")
                .role(Role.ADMIN)
                .status(UserStatus.ACTIVE)
                .build();

        User fleetManager = User.builder()
                .name("Fleet Operations Manager")
                .email("fleet.manager@fleetflow.logistics.io")
                .password(passwordEncoder.encode("Password@123"))
                .phone("+91 98765 11111")
                .role(Role.FLEET_MANAGER)
                .status(UserStatus.ACTIVE)
                .build();

        User warehouseManager = User.builder()
                .name("Hyderabad Warehouse Manager")
                .email("warehouse.manager@fleetflow.logistics.io")
                .password(passwordEncoder.encode("Password@123"))
                .phone("+91 98765 22222")
                .role(Role.WAREHOUSE_MANAGER)
                .status(UserStatus.ACTIVE)
                .build();

        userRepository.saveAll(List.of(admin, fleetManager, warehouseManager));
    }

    private void seedDrivers() {
        Driver d1 = Driver.builder()
                .name("Rajesh Sharma")
                .email("rajesh.sharma@fleetflow.io")
                .phone("+91 91234 56789")
                .licenseNumber("DL-09-2018-88741")
                .status(DriverStatus.ON_DELIVERY)
                .currentLocation("Suryapet, NH65")
                .rating(4.9)
                .deliveries(342)
                .experience("8 years")
                .build();

        Driver d2 = Driver.builder()
                .name("Venkatesh Rao")
                .email("venkatesh.rao@fleetflow.io")
                .phone("+91 99887 65432")
                .licenseNumber("DL-07-2019-10923")
                .status(DriverStatus.ON_DELIVERY)
                .currentLocation("Nalgonda Bypass")
                .rating(4.8)
                .deliveries(289)
                .experience("6 years")
                .build();

        Driver d3 = Driver.builder()
                .name("Srinivas Murthy")
                .email("srinivas.m@fleetflow.io")
                .phone("+91 97001 22334")
                .licenseNumber("DL-31-2015-55412")
                .status(DriverStatus.AVAILABLE)
                .currentLocation("Visakhapatnam Port")
                .rating(4.95)
                .deliveries(450)
                .experience("11 years")
                .build();

        Driver d4 = Driver.builder()
                .name("Mahesh Reddy")
                .email("mahesh.reddy@fleetflow.io")
                .phone("+91 96555 44332")
                .licenseNumber("DL-51-2020-44123")
                .status(DriverStatus.ON_DELIVERY)
                .currentLocation("Anantapur Toll")
                .rating(4.7)
                .deliveries(198)
                .experience("5 years")
                .build();

        driverRepository.saveAll(List.of(d1, d2, d3, d4));
    }

    private void seedVehicles() {
        Vehicle v1 = Vehicle.builder()
                .vehicleNumber("AP-09-CB-4892")
                .type("Container Truck")
                .capacity("10.0 Tons")
                .capacityKg(10000.0)
                .currentLoadKg(7800.0)
                .fuelBattery("76% (Diesel)")
                .status(VehicleStatus.ON_ROUTE)
                .currentLocation("Vijayawada Highway (NH65)")
                .lastMaintenance("2026-09-15")
                .build();

        Vehicle v2 = Vehicle.builder()
                .vehicleNumber("TS-07-UE-9011")
                .type("Refrigerated Van")
                .capacity("3.5 Tons")
                .capacityKg(3500.0)
                .currentLoadKg(2400.0)
                .fuelBattery("88% (EV Battery)")
                .status(VehicleStatus.ON_ROUTE)
                .currentLocation("Nalgonda Bypass")
                .lastMaintenance("2026-09-28")
                .build();

        Vehicle v3 = Vehicle.builder()
                .vehicleNumber("AP-31-TA-1122")
                .type("Heavy Hauler Truck")
                .capacity("16.0 Tons")
                .capacityKg(16000.0)
                .currentLoadKg(0.0)
                .fuelBattery("92% (Diesel)")
                .status(VehicleStatus.AVAILABLE)
                .currentLocation("Visakhapatnam Port Depot")
                .lastMaintenance("2026-09-10")
                .build();

        vehicleRepository.saveAll(List.of(v1, v2, v3));
    }

    private void seedWarehouses() {
        Warehouse w1 = Warehouse.builder()
                .name("Hyderabad Central Logistics Hub")
                .location("Hyderabad")
                .address("ORR Exit 10, Patancheru Industrial Area, Hyderabad, TS 502319")
                .capacity(10000.0)
                .currentLoad(8025.0)
                .status(WarehouseStatus.HEALTHY)
                .manager("R. K. Varma")
                .incomingCount(42)
                .outgoingCount(68)
                .build();

        Warehouse w2 = Warehouse.builder()
                .name("Vijayawada Regional Distribution Center")
                .location("Vijayawada")
                .address("NH16 Bypass, Enikepadu, Vijayawada, AP 521108")
                .capacity(6500.0)
                .currentLoad(5850.0)
                .status(WarehouseStatus.HIGH_LOAD)
                .manager("G. Satyanarayana")
                .incomingCount(28)
                .outgoingCount(34)
                .build();

        Warehouse w3 = Warehouse.builder()
                .name("Visakhapatnam Port Express Warehouse")
                .location("Visakhapatnam")
                .address("Port Connectivity Highway, Gajuwaka, Visakhapatnam, AP 530026")
                .capacity(12000.0)
                .currentLoad(7200.0)
                .status(WarehouseStatus.HEALTHY)
                .manager("C. H. Raju")
                .incomingCount(55)
                .outgoingCount(40)
                .build();

        warehouseRepository.saveAll(List.of(w1, w2, w3));
    }

    private void seedShipments() {
        Driver d1 = driverRepository.findAll().stream().findFirst().orElse(null);
        Vehicle v1 = vehicleRepository.findAll().stream().findFirst().orElse(null);
        Warehouse w1 = warehouseRepository.findAll().stream().findFirst().orElse(null);

        List<Shipment> shipments = new ArrayList<>();

        for (int i = 1; i <= 10; i++) {
            String tracking = String.format("SHP-2026-00124%d", (4 + i));
            ShipmentStatus status = (i % 3 == 0) ? ShipmentStatus.DELIVERED : (i % 5 == 0 ? ShipmentStatus.DELAYED : ShipmentStatus.IN_TRANSIT);
            Priority priority = (i % 2 == 0) ? Priority.HIGH : Priority.MEDIUM;

            Shipment s = Shipment.builder()
                    .trackingNumber(tracking)
                    .customerName("TechCorp Solutions India #" + i)
                    .customerEmail("client" + i + "@techcorp.in")
                    .customerContact("+91 98765 4321" + (i % 10))
                    .origin(w1 != null ? w1.getName() : "Hyderabad Central Hub")
                    .destination("Vijayawada Tech Park Phase " + i)
                    .destinationAddress("Plot " + (40 + i) + ", Auto Nagar, Vijayawada, AP 520007")
                    .weight((300 + i * 50) + " kg")
                    .weightKg(300.0 + i * 50)
                    .packageType(i % 2 == 0 ? "Electronics & Components" : "Industrial Supplies")
                    .priority(priority)
                    .status(status)
                    .driver(d1)
                    .vehicle(v1)
                    .warehouse(w1)
                    .currentLocation("Vijayawada Highway (NH65) near Suryapet")
                    .distanceKm(275.0 + i * 10)
                    .eta("Today, 4:30 PM")
                    .createdDate(LocalDate.now().minusDays(i))
                    .events(new ArrayList<>())
                    .build();

            DeliveryEvent ev1 = DeliveryEvent.builder()
                    .shipment(s)
                    .eventType(EventType.ORDER_CREATED)
                    .step("Order Created")
                    .location(s.getOrigin())
                    .description("Order registered in system")
                    .timeFormatted("Oct 04, 09:00 AM")
                    .completed(true)
                    .currentStep(false)
                    .timestamp(LocalDateTime.now().minusDays(i))
                    .build();

            DeliveryEvent ev2 = DeliveryEvent.builder()
                    .shipment(s)
                    .eventType(EventType.IN_TRANSIT)
                    .step("In Transit")
                    .location("Highway NH65")
                    .description("Consignment in transit to destination")
                    .timeFormatted("Oct 05, 10:30 AM")
                    .completed(true)
                    .currentStep(true)
                    .timestamp(LocalDateTime.now())
                    .build();

            s.getEvents().add(ev1);
            s.getEvents().add(ev2);

            shipments.add(s);
        }

        shipmentRepository.saveAll(shipments);
    }
}
