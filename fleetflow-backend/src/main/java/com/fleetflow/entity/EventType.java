package com.fleetflow.entity;

public enum EventType {
    ORDER_CREATED,
    PICKED_UP,
    ARRIVED_AT_WAREHOUSE,
    DISPATCHED,
    IN_TRANSIT,
    OUT_FOR_DELIVERY,
    DELIVERED,
    DELAYED,
    CANCELLED
}
