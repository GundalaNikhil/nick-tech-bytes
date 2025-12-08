# Subarrays with K Different Integers

## Problem Description

**Real-World Scenario:**
A market analyst wants to find time periods where exactly `K` different stocks were active/traded.

**Example Setup:** 
Analyzing a playlist to find segments containing exactly K unique artists.

**What is Subarrays with K Different Integers?**
Given an integer array `nums` and an integer `k`, return the number of good subarrays of `nums`.
A good subarray is a subarray where the number of different integers in that subarray is exactly `k`.

**Why is it important?**
- Sliding Window (Exact K vs At Most K)
- Two Pointers (Three Pointers technique)
- "At Most K" - "At Most K-1" trick

**Your Task:** 
Return count of subarrays.

**Difficulty:** Hard
**Tags:** Sliding Window, Hard, Two Pointers, "At Most K" - "At Most K-1" Trick, O(N), Interview

---

## Examples

### Example 1:
**Input:** `nums = [1,2,1,2,3], k = 2`
**Output:** `7`
**Explanation:** Subarrays formed with exactly 2 different integers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2].

### Example 2:
**Input:** `nums = [1,2,1,3,4], k = 3`
**Output:** `3`
**Explanation:** Subarrays formed with exactly 3 different integers: [1,2,1,3], [2,1,3], [1,3,4].

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 2 * 10^4 |
| k | 1 ≤ k ≤ n |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Adobe |
| 🔵 Amazon | 🟡 Microsoft | 🟢 SalesForce |
| 🔵 Facebook | 🟡 Apple | 🟢 Oracle |

---

## Follow-up Questions

1. Why is "Exactly K" hard? (Window isn't monotonic in a simple way).
2. Why `atMost(K) - atMost(K-1)`? (Inclusion-Exclusion principle).
3. How to implement `atMost(K)`? (Standard sliding window counting subarrays).
4. Alternative: Three pointers (Left1, Left2, Right).
