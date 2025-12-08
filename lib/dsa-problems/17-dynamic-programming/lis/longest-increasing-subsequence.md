# Longest Increasing Subsequence (LIS)

## Problem Description

**Real-World Scenario:**
A stock analyst is looking at historical stock prices. She wants to find the longest sequence of days where the stock price was continuously increasing (not necessarily consecutive days). This helps identify the best sustained growth period.

**Example Setup:** 
Arjun is tracking his fitness journey. He has his daily step counts for a month. He wants to find the longest streak of days (not consecutive) where each day's steps beat the previous day in the streak. What's the longest such improvement streak?

**What is the Longest Increasing Subsequence?**
Given an array, find the length of the longest subsequence where elements are in strictly increasing order. Elements don't need to be consecutive in the original array.

**Why is it important?**
- Stock market analysis
- Patience sorting algorithm
- Data compression
- Foundation for many DP problems

**Your Task:** 
Find the length of the longest strictly increasing subsequence.

---

## Examples

### Example 1:
**Input:** `nums = [10, 9, 2, 5, 3, 7, 101, 18]`
**Output:** `4`
**LIS:** [2, 3, 7, 101] or [2, 3, 7, 18] or [2, 5, 7, 101]
**Explanation:** Multiple LIS of length 4 exist.

### Example 2:
**Input:** `nums = [0, 1, 0, 3, 2, 3]`
**Output:** `4`
**LIS:** [0, 1, 2, 3]
**Explanation:** Note that we pick 2 from index 4, not index 2.

### Example 3:
**Input:** `nums = [7, 7, 7, 7, 7]`
**Output:** `1`
**Explanation:** All same elements - LIS is just one element.

### Example 4:
**Input:** `nums = [1, 2, 3, 4, 5]`
**Output:** `5`
**Explanation:** Already sorted - entire array is the LIS.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 2500 |
| Element Range | -10⁴ ≤ nums[i] ≤ 10⁴ |
| Data Type | Integer array |
| Special Conditions | Strictly increasing (no equal) |
| Time Complexity | O(n²) basic, O(n log n) optimal |
| Space Complexity | O(n) |
| Output Format | Length of LIS |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Uber | 🟢 Citadel |
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Two Sigma |
| 🔵 Microsoft | 🟡 ByteDance | 🟢 DE Shaw |
| 🔵 Apple | 🟡 TikTok | 🟢 Tower Research |

---

## Follow-up Questions

1. Can you solve it in O(n log n) using binary search?
2. How would you print the actual LIS, not just the length?
3. How would you count the number of LIS of maximum length?
4. What's the relationship between LIS and patience sorting?
