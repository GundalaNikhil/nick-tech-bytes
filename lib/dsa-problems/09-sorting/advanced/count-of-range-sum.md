# Count of Range Sum

## Problem Description

**Real-World Scenario:**
A financial analyst counts the number of time periods where the cumulative return of a stock falls within a specific "stable" range.

**Example Setup:** 
A sensor data processor counts the number of subarrays in a signal stream where the sum of values is within a valid operating range.

**What is Count of Range Sum?**
Given an integer array `nums` and two integers `lower` and `upper`, return the number of range sums that lie in `[lower, upper]` inclusive. Range sum `S(i, j)` is defined as the sum of the elements in `nums` between indices `i` and `j` inclusive, where `i <= j`.

**Why is it important?**
- Merge Sort (Divide and Conquer)
- Binary Indexed Tree (Fenwick Tree) with discretization
- Segment Tree
- Hard array problem

**Your Task:** 
Return the count of valid range sums.

---

## Examples

### Example 1:
**Input:** `nums = [-2,5,-1], lower = -2, upper = 2`
**Output:** `3`
**Explanation:** 
Ranges: [0,0] sum -2 (valid), [0,1] sum 3 (invalid), [0,2] sum 2 (valid).
[1,1] sum 5 (invalid), [1,2] sum 4 (invalid).
[2,2] sum -1 (valid).
Valid ranges: [0,0], [0,2], [2,2]. Total 3.

### Example 2:
**Input:** `nums = [0], lower = 0, upper = 0`
**Output:** `1`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ nums.length ≤ 10⁵ |
| Element Value | -2³¹ ≤ nums[i] ≤ 2³¹-1 |
| Range | -2³¹ ≤ lower ≤ upper ≤ 2³¹-1 |
| Data Type | Integer array (use Long for sums) |
| Time Complexity | O(n log n) |
| Space Complexity | O(n) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Palantir |
| 🔵 Amazon | 🟡 Apple | 🟢 Two Sigma |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Citadel |

---

## Follow-up Questions

1. Why use Prefix Sums first?
2. How does Merge Sort help count ranges `lower <= P[j] - P[i] <= upper`?
3. What is the condition `P[j] - upper <= P[i] <= P[j] - lower`?
4. How to use a Fenwick Tree with coordinate compression?
