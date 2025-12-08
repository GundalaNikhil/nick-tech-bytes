# Minimum Number of Taps to Open to Water a Garden

## Problem Description

**Real-World Scenario:**
A landscape architect places the minimum number of sprinklers (with varying ranges) to cover a linear garden completely.

**Example Setup:** 
A Wi-Fi network planner places the minimum number of access points to cover a long hallway.

**What is Min Taps to Water Garden?**
There is a one-dimensional garden on the x-axis. The garden starts at the point `0` and ends at the point `n`. (The length of the garden is `n`). There are `n + 1` taps located at points `[0, 1, ..., n]` in the garden. Given an integer `n` and an integer array `ranges` of length `n + 1` where `ranges[i]` (0-indexed) means the `ith` tap can water the area `[i - ranges[i], i + ranges[i]]` if it was open. Return the minimum number of taps that should be open to water the whole garden, If the garden cannot be watered return -1.

**Why is it important?**
- Greedy Interval Coverage
- Jump Game variant
- Dynamic Programming
- Optimization

**Your Task:** 
Return minimum taps.

**Difficulty:** Medium
**Tags:** Greedy, Interval, Greedy Interval Coverage, Jump Game Variant, Dynamic Programming, Optimization, O(N), Interview

---

## Examples

### Example 1:
**Input:** `n = 5, ranges = [3,4,1,1,0,0]`
**Output:** `1`
**Explanation:** Tap 1 covers [-3, 5]. Covers [0, 5].

### Example 2:
**Input:** `n = 3, ranges = [0,0,0,0]`
**Output:** `-1`

### Example 3:
**Input:** `n = 7, ranges = [1,2,1,0,2,1,0,1]`
**Output:** `3`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Length | 1 ≤ n ≤ 10⁴ |
| Ranges | 0 ≤ ranges[i] ≤ 100 |
| Data Type | Integer array |
| Time Complexity | O(N) or O(N log N) |
| Space Complexity | O(N) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Twitter |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Square |
| 🔵 Facebook | 🟡 Apple | 🟢 Yelp |

---

## Follow-up Questions

1. How to convert taps to intervals `[max(0, i-r), min(n, i+r)]`?
2. Why compute `max_reach[start] = end`?
3. How is this similar to Video Stitching / Jump Game II?
4. What if ranges are very large?
