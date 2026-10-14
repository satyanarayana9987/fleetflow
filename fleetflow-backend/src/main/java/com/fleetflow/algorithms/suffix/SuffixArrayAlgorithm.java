package com.fleetflow.algorithms.suffix;

import org.springframework.stereotype.Component;
import java.util.Arrays;
import java.util.Comparator;

@Component
public class SuffixArrayAlgorithm {

    public Integer[] buildSuffixArray(String text) {
        if (text == null) return new Integer[0];
        int n = text.length();
        Integer[] suffixArray = new Integer[n];
        for (int i = 0; i < n; i++) suffixArray[i] = i;

        Arrays.sort(suffixArray, Comparator.comparing(text::substring));
        return suffixArray;
    }
}
