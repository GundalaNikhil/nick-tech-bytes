# Interleaving String

## Problem Description

**Real-World Scenario:**
A playlist merger creates a new playlist by interleaving songs from two source playlists while maintaining each playlist's order.

**Example Setup:** 
A data stream merger interleaves packets from two sources. Verify if the output stream is a valid interleaving of the inputs.

**What is Interleaving String?**
Given strings s1, s2, and s3, check if s3 is formed by interleaving s1 and s2 while preserving their relative character orders.

**Why is it important?**
- 2D DP on strings
- Two-pointer with backtracking
- Stream interleaving
- Merge verification

**Your Task:** 
Return true if s3 is a valid interleaving.

---

## Examples

### Example 1:
**Input:** `s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"`
**Output:** `true`
**Explanation:** s3 is formed by interleaving s1 and s2.

### Example 2:
**Input:** `s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"`
**Output:** `false`
**Explanation:** Not a valid interleaving.

### Example 3:
**Input:** `s1 = "", s2 = "", s3 = ""`
**Output:** `true`
**Explanation:** Empty strings interleave to empty.

---

## Constraints

| Constraint | Value |
|------------|-------|
| S1 Length | 0 ≤ s1.length ≤ 100 |
| S2 Length | 0 ≤ s2.length ≤ 100 |
| S3 Length | 0 ≤ s3.length ≤ 200 |
| Data Type | Lowercase letters |
| Time Complexity | O(m × n) |
| Space Complexity | O(n) optimized |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Spotify |
| 🔵 Amazon | 🟡 Adobe | 🟢 Pandora |
| 🔵 Microsoft | 🟡 Apple | 🟢 SoundCloud |

---

## Follow-up Questions

1. What does dp[i][j] represent?
2. Why is greedy not enough?
3. Can you optimize to O(min(m,n)) space?
4. What about finding the actual interleaving?
