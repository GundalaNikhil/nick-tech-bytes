# Number of Longest Increasing Subsequence

## Problem Description

**Real-World Scenario:**
A stock analyzer counts how many different ways a stock could have achieved its longest streak of price increases.

**Example Setup:** 
A game designer counts the number of distinct paths to achieve the maximum possible score progression.

**What is Number of LIS?**
Given an integer array `nums`, return the number of longest increasing subsequences.

**Why is it important?**
- LIS extension
- Counting with DP
- Double DP array (length and count)
- Combinatorics

**Your Task:** 
Return the count of LIS.

**Difficulty:** Medium
**Tags:** Dynamic Programming, Lis, Lis Extension, Counting With Dp, Double Dp Array, Combinatorics, O(n²), Interview

---

## Examples

### Example 1:
**Input:** `nums = [1,3,5,4,7]`
**Output:** `2`
**Explanation:** LIS length is 4. Two subsequences: [1,3,4,7] and [1,3,5,7].

### Example 2:
**Input:** `nums = [2,2,2,2,2]`
**Output:** `5`
**Explanation:** LIS length is 1. Five subsequences of length 1.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 2000 |
| Element Value | -10⁶ ≤ nums[i] ≤ 10⁶ |
| Data Type | Integer array |
| Special Conditions | Strictly increasing |
| Time Complexity | O(n²) |
| Space Complexity | O(n) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Citadel |
| 🔵 Google | 🟡 Apple | 🟢 DE Shaw |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Two Sigma |

---

## Follow-up Questions

1. Why do we need two arrays (`len` and `cnt`)?
2. How do you update count when `len[i] == len[j] + 1`?
3. How do you update count when `len[i] < len[j] + 1`?
4. Can you optimize to O(n log n) using Segment Tree?
