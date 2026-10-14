package com.fleetflow.algorithms.dp;

import org.springframework.stereotype.Component;

@Component
public class LevenshteinAlgorithm {

    public int calculateDistance(String s1, String s2) {
        if (s1 == null && s2 == null) return 0;
        if (s1 == null || s1.isEmpty()) return s2 != null ? s2.length() : 0;
        if (s2 == null || s2.isEmpty()) return s1.length();

        int len1 = s1.length();
        int len2 = s2.length();

        int[][] dp = new int[len1 + 1][len2 + 1];

        for (int i = 0; i <= len1; i++) {
            dp[i][0] = i;
        }

        for (int j = 0; j <= len2; j++) {
            dp[0][j] = j;
        }

        for (int i = 1; i <= len1; i++) {
            for (int j = 1; j <= len2; j++) {
                int cost = (s1.charAt(i - 1) == s2.charAt(j - 1)) ? 0 : 1;

                dp[i][j] = Math.min(
                        Math.min(dp[i - 1][j] + 1,      // Deletion
                                 dp[i][j - 1] + 1),     // Insertion
                        dp[i - 1][j - 1] + cost         // Substitution
                );
            }
        }

        return dp[len1][len2];
    }
}
