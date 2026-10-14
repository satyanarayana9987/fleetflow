# FleetFlow – Intelligent Logistics Management Platform Backend

A production-style, modular Spring Boot 3.x RESTful backend for **FleetFlow – Intelligent Logistics Management Platform**. Built with Java 17, Spring Data JPA, Spring Security with JWT authentication, PostgreSQL database support, OpenAPI / Swagger documentation, and integrated Data Structures & Algorithms (DSA) execution engines.

---

## 1. Technology Stack

* **Language**: Java 17
* **Framework**: Spring Boot 3.3.4
* **Security**: Spring Security & JWT (JSON Web Token authentication)
* **Persistence**: Spring Data JPA & Hibernate
* **Primary Database**: PostgreSQL (H2 for automated testing)
* **Validation**: Jakarta Validation API
* **API Documentation**: Springdoc OpenAPI 3 / Swagger UI
* **Build System**: Apache Maven

---

## 2. Project & Environment Information

* **Base Package**: `com.fleetflow`
* **Main Class**: `com.fleetflow.FleetFlowApplication`
* **Server Port**: `9090`
* **Base API Path**: `/api`
* **Frontend Compatibility Target**: `http://localhost:5173` (Vite React)

### Required Environment Variables (Optional Override Defaults)

| Variable | Default Fallback Value | Description |
| :--- | :--- | :--- |
| `DB_URL` | `jdbc:postgresql://localhost:5432/fleetflow` | PostgreSQL Connection URL |
| `DB_USERNAME` | `postgres` | Database Username |
| `DB_PASSWORD` | `postgres` | Database Password |
| `JWT_SECRET` | *(Default 256-bit dev secret)* | Secret key for JWT signature verification |

---

## 3. Project Directory & Package Structure

```
fleetflow-backend
├── pom.xml
├── README.md
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── fleetflow
    │   │           ├── FleetFlowApplication.java
    │   │           ├── algorithms
    │   │           │   ├── dp (LevenshteinAlgorithm)
    │   │           │   ├── graph (DijkstraAlgorithm, BipartiteMatchingAlgorithm, FordFulkersonAlgorithm)
    │   │           │   ├── npcomplete (ThreeSatAlgorithm)
    │   │           │   ├── parallel (BloomFilterService)
    │   │           │   ├── randomized (MillerRabinAlgorithm)
    │   │           │   ├── string (KMPAlgorithm)
    │   │           │   └── suffix (SuffixArrayAlgorithm)
    │   │           ├── config (SecurityConfig, OpenApiConfig, DataInitializer)
    │   │           ├── controller (AuthController, UserController, DriverController, VehicleController, WarehouseController, ShipmentController, DeliveryEventController, DashboardController, RouteController, AnalyticsController, DSAController)
    │   │           ├── dto (Request/Response Transfer Objects)
    │   │           ├── entity (User, Driver, Vehicle, Warehouse, Shipment, DeliveryEvent, Enums)
    │   │           ├── exception (GlobalExceptionHandler, Custom Exceptions)
    │   │           ├── mapper (UserMapper, DriverMapper, VehicleMapper, WarehouseMapper, ShipmentMapper)
    │   │           ├── repository (Spring Data JPA Repositories)
    │   │           ├── security (JwtTokenProvider, JwtAuthenticationFilter, CustomUserDetailsService, UserPrincipal)
    │   │           └── service (AuthService, UserService, DriverService, VehicleService, WarehouseService, ShipmentService, DeliveryEventService, RouteService, AnalyticsService, DashboardService, DSAService)
    │   └── resources
    │       ├── application.properties
    │       └── application-example.properties
    └── test
        ├── java
        │   └── com
        │       └── fleetflow
        │           └── algorithms (Unit tests for KMP, Levenshtein, Dijkstra, Matching, Ford-Fulkerson)
        └── resources
            └── application.properties (H2 in-memory configuration)
```

---

## 4. Database Setup (PostgreSQL)

1. Open PostgreSQL terminal or tool (pgAdmin / DBeaver) and create the database:
   ```sql
   CREATE DATABASE fleetflow;
   ```

2. Set environment variables (optional) or update `application.properties`:
   ```properties
   DB_URL=jdbc:postgresql://localhost:5432/fleetflow
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   ```

3. Upon first startup, Hibernate auto-generates tables (`spring.jpa.hibernate.ddl-auto=update`) and `DataInitializer` seeds standard administrative accounts, drivers, vehicles, warehouses, and shipments.

---

## 5. How to Import into Eclipse / Spring Tool Suite (STS)

1. Open Eclipse or Spring Tools.
2. Select **File** → **Import...**
3. Expand **Maven** and select **Existing Maven Projects**.
4. Click **Next**, then **Browse...** to select directory `fleetflow-backend`.
5. Ensure `pom.xml` is selected and click **Finish**.
6. Right-click project → **Run As** → **Spring Boot App** or **Java Application** (`FleetFlowApplication.java`).

---

## 6. How to Run the Backend

### Using Maven (Command Line)

```bash
# Clean and test project
mvn clean test

# Build executable JAR
mvn clean package

# Run Spring Boot application
mvn spring-boot:run
```

### Running Packaged Jar

```bash
java -jar target/fleetflow-backend-0.0.1-SNAPSHOT.jar
```

The application starts on `http://localhost:9090` with base API path `http://localhost:9090/api`.

---

## 7. Default Development Credentials

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@fleetflow.logistics.io` | `Password@123` | Full Access |
| **Fleet Manager** | `fleet.manager@fleetflow.logistics.io` | `Password@123` | Vehicles, Drivers, Shipments, Routes, Analytics |
| **Warehouse Manager** | `warehouse.manager@fleetflow.logistics.io` | `Password@123` | Warehouses, Shipments |

---

## 8. Swagger UI & REST API Endpoints

Once running, access OpenAPI Interactive Documentation at:
* **Swagger UI**: [http://localhost:9090/swagger-ui/index.html](http://localhost:9090/swagger-ui/index.html)
* **OpenAPI Specs**: [http://localhost:9090/api-docs](http://localhost:9090/api-docs)

### Core REST Endpoints

#### Authentication (`/api/auth`)
* `POST /api/auth/register` - User registration
* `POST /api/auth/login` - User login (returns JWT Token)
* `GET /api/auth/me` - Authenticated profile

#### Shipments (`/api/shipments`)
* `GET /api/shipments` - Get all shipments
* `GET /api/shipments/{id}` - Get shipment by ID
* `GET /api/shipments/tracking/{trackingNumber}` - Search shipment by tracking ID (e.g. `SHP-2026-001245`)
* `GET /api/shipments/search?q={query}` - Search shipments
* `POST /api/shipments` - Create shipment
* `PUT /api/shipments/{id}` - Update shipment
* `PATCH /api/shipments/{id}/status` - Update status & location
* `DELETE /api/shipments/{id}` - Delete shipment

#### Delivery Timeline Events (`/api/shipments/{shipmentId}/events`)
* `GET /api/shipments/{shipmentId}/events` - Get tracking timeline
* `POST /api/shipments/{shipmentId}/events` - Add timeline event

#### Fleet & Operations (`/api/drivers`, `/api/vehicles`, `/api/warehouses`)
* `GET /api/drivers`, `GET /api/drivers/available` - Driver management
* `GET /api/vehicles`, `GET /api/vehicles/available` - Fleet management
* `GET /api/warehouses` - Warehouse capacity management

#### Route Optimization (`/api/routes`)
* `GET /api/routes` - Get active routes
* `POST /api/routes/optimize` - Dijkstra shortest route calculator

#### Executive Dashboard & Analytics (`/api/dashboard`, `/api/analytics`)
* `GET /api/dashboard/summary` - KPI cards and active metrics
* `GET /api/analytics/summary` - Range-filtered analytics summary

#### DSA Algorithms Execution Sandbox (`/api/dsa`)
* `POST /api/dsa/kmp/search` - Knuth-Morris-Pratt pattern matching
* `POST /api/dsa/levenshtein` - Levenshtein edit distance
* `POST /api/dsa/dijkstra` - Dijkstra shortest path
* `POST /api/dsa/matching` - Hopcroft-Karp driver bipartite matching
* `POST /api/dsa/max-flow` - Ford-Fulkerson network flow
* `POST /api/dsa/bloom-filter/check` - Bloom Filter tracking lookup
* `POST /api/dsa/{algoId}` - Generic DSA algorithm dispatcher

---

## 9. Connecting to the React Frontend

The FleetFlow React Frontend expects the backend at `http://localhost:9090/api`.

Start the Spring Boot backend on port `9090`. CORS is pre-configured to allow requests from `http://localhost:5173`.
