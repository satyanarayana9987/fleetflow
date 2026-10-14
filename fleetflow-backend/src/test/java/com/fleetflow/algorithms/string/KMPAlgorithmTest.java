package com.fleetflow.algorithms.string;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class KMPAlgorithmTest {

    private KMPAlgorithm kmpAlgorithm;

    @BeforeEach
    void setUp() {
        kmpAlgorithm = new KMPAlgorithm();
    }

    @Test
    void testPatternMatchFound() {
        String text = "HYD-SHP-2026-VJA-001245-SHP-2026";
        String pattern = "SHP-2026";

        List<Integer> positions = kmpAlgorithm.search(text, pattern);

        assertNotNull(positions);
        assertEquals(2, positions.size());
        assertEquals(4, positions.get(0));
        assertEquals(24, positions.get(1));
    }

    @Test
    void testPatternNotFound() {
        String text = "HYD-SHP-2026-VJA";
        String pattern = "NON_EXISTENT";

        List<Integer> positions = kmpAlgorithm.search(text, pattern);

        assertNotNull(positions);
        assertTrue(positions.isEmpty());
    }
}
