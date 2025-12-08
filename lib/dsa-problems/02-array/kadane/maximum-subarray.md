# Maximum Subarray (Kadane's Algorithm)

## Problem Description

**Real-World Scenario:**
A stock analyst finds the best contiguous trading period. Given daily profit/loss, find the period with maximum cumulative profit.

**Example Setup:** 
A temperature sensor finds the warmest continuous spell. Find the subarray with maximum sum.

**What is Maximum Subarray?**
Find the contiguous subarray with the largest sum. Kadane's algorithm solves this in O(n) time.

**Why is it important?**
- Kadane's algorithm
- Foundation for many DP problems
- Financial analysis
- Interview classic

**Your Task:** 
Return the maximum subarray sum.

**Difficulty:** Medium
**Tags:** Array, Kadane, Kadane'S, Foundation For Many Dp Problems, Financial Analysis, Interview Classic, O(n), Interview

---

## Examples

### Example 1:
**Input:** `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`
**Output:** `6`
**Explanation:** Subarray [4, -1, 2, 1] has sum 6.

### Example 2:
**Input:** `nums = [1]`
**Output:** `1`
**Explanation:** Single element.

### Example 3:
**Input:** `nums = [5, 4, -1, 7, 8]`
**Output:** `23`
**Explanation:** Entire array.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 10⁵ |
| Element Range | -10⁴ ≤ nums[i] ≤ 10⁴ |
| Data Type | Integer array |
| Special Conditions | At least one element |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Maximum sum |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Robinhood |
| 🔵 Microsoft | 🟡 LinkedIn | 🟢 Citadel |
| 🔵 Google | 🟡 Apple | 🟢 Jane Street |

---

## Follow-up Questions

1. What is Kadane's algorithm?
2. How to track the actual subarray indices?
3. What about maximum product subarray?
4. Can you use divide and conquer?
