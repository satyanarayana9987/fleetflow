package com.fleetflow.algorithms.randomized;

import org.springframework.stereotype.Component;
import java.math.BigInteger;

@Component
public class MillerRabinAlgorithm {

    public boolean isProbablePrime(long n, int iterations) {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 == 0) return false;

        BigInteger bigN = BigInteger.valueOf(n);
        return bigN.isProbablePrime(iterations);
    }
}
