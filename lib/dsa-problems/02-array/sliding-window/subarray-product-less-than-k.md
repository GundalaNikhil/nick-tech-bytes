# Subarray Product Less Than K

## Problem Description

**Real-World Scenario:**
A risk analysis tool counts the number of consecutive days where the cumulative risk multiplier remains below a safety threshold.

**Example Setup:** 
A sequence analyzer counts subarrays where the product of elements is small enough to avoid overflow.

**What is Subarray Product Less Than K?**
Given an array of integers `nums` and an integer `k`, return the number of contiguous subarrays where the product of all the elements in the subarray is strictly less than `k`.

**Why is it important?**
- Sliding Window (Variable Size)
- Two Pointers
- Counting subarrays
- Optimization

**Your Task:** 
Return the count of subarrays.

**Difficulty:** Medium
**Tags:** Array, Sliding Window, Two Pointers, Counting Subarrays, Optimization, O(N), Interview

---

## Examples

### Example 1:
**Input:** `nums = [10,5,2,6], k = 100`
**Output:** `8`
**Explanation:** 
[10], [5], [2], [6], [10,5], [5,2], [2,6], [5,2,6].
Product of [10,5,2] is 100 (not strictly less).

### Example 2:
**Input:** `nums = [1,2,3], k = 0`
**Output:** `0`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 3 × 10⁴ |
| Element Value | 1 ≤ nums[i] ≤ 1000 |
| K Value | 0 ≤ k ≤ 10⁶ |
| Data Type | Integer array |
| Time Complexity | O(N) |
| Space Complexity | O(1) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Yandex |
| 🔵 Amazon | 🟡 Microsoft | 🟢 SAP |
| 🔵 Facebook | 🟡 Apple | 🟢 Oracle |

---

## Follow-up Questions

1. Why does `right - left + 1` give the number of new subarrays ending at `right`?
2. How to handle `k <= 1` (since nums[i] >= 1)?
3. What if numbers could be negative or zero?
4. Can you use Logarithms to convert to sum problem?
