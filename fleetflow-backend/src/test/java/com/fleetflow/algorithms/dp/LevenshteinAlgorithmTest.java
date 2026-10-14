package com.fleetflow.algorithms.dp;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LevenshteinAlgorithmTest {

    private LevenshteinAlgorithm levenshteinAlgorithm;

    @BeforeEach
    void setUp() {
        levenshteinAlgorithm = new LevenshteinAlgorithm();
    }

    @Test
    void testExactMatch() {
        int distance = levenshteinAlgorithm.calculateDistance("Vijayawada", "Vijayawada");
        assertEquals(0, distance);
    }

    @Test
    void testSingleTypoInsertion() {
        int distance = levenshteinAlgorithm.calculateDistance("Vijaywada", "Vijayawada");
        assertEquals(1, distance);
    }

    @Test
    void testDifferentCities() {
        int distance = levenshteinAlgorithm.calculateDistance("Hyderabad", "Vijayawada");
        assertTrue(distance > 0);
    }
}
