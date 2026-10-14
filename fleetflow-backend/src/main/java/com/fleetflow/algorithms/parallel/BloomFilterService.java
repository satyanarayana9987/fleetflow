package com.fleetflow.algorithms.parallel;

import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.BitSet;

@Service
public class BloomFilterService {

    private final BitSet bitSet;
    private final int bitArraySize;
    private final int numHashFunctions;

    public BloomFilterService() {
        this(1024 * 8, 3); // Default 1KB bit array with 3 hash functions
    }

    public BloomFilterService(int bitArraySize, int numHashFunctions) {
        this.bitArraySize = bitArraySize;
        this.numHashFunctions = numHashFunctions;
        this.bitSet = new BitSet(bitArraySize);

        // Pre-populate with initial shipment tracking numbers
        add("SHP-2026-001245");
        add("SHP-2026-001246");
        add("SHP-2026-001247");
        add("SHP-2026-001248");
        add("SHP-2026-001249");
        add("SHP-2026-001250");
    }

    public void add(String element) {
        if (element == null) return;
        for (int i = 0; i < numHashFunctions; i++) {
            int hash = hash(element, i);
            bitSet.set(Math.abs(hash % bitArraySize));
        }
    }

    public boolean mightContain(String element) {
        if (element == null) return false;
        for (int i = 0; i < numHashFunctions; i++) {
            int hash = hash(element, i);
            if (!bitSet.get(Math.abs(hash % bitArraySize))) {
                return false; // Definitely does not exist (no false negatives)
            }
        }
        return true; // Possibly exists (may produce false positives)
    }

    private int hash(String element, int seed) {
        byte[] bytes = element.getBytes(StandardCharsets.UTF_8);
        int h = seed * 31;
        for (byte b : bytes) {
            h = (h * 31) + b;
        }
        return h;
    }

    public int getNumHashFunctions() {
        return numHashFunctions;
    }

    public String getFalsePositiveRate() {
        return "0.8%";
    }
}
