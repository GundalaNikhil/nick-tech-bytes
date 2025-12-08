# Maximum Subarray Sum (Kadane's Algorithm)

## Problem Description

**Real-World Scenario:**
A financial analyst is looking at daily profit/loss data for a company. Some days are profits (+), some are losses (-). She wants to find the best contiguous period that had the maximum net profit.

**Example Setup:** 
Vikram runs a food stall. His daily earnings (after expenses) can be positive or negative. He wants to find the best consecutive stretch of days where his total earnings were maximum. Which days should he focus on replicating?

**What is Maximum Subarray Sum?**
Given an array of integers (positive and negative), find the contiguous subarray with the largest sum. Kadane's algorithm solves this in O(n) time - it's elegant and powerful!

**Why is it important?**
- Financial analysis
- Image processing (max rectangle)
- Signal processing
- Foundation for many optimization problems

**Your Task:** 
Find the contiguous subarray with the maximum sum and return that sum.

---

## Examples

### Example 1:
**Input:** `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`
**Output:** `6`
**Subarray:** [4, -1, 2, 1]
**Explanation:** This contiguous sequence has sum = 6.

### Example 2:
**Input:** `nums = [1]`
**Output:** `1`
**Explanation:** Single element array.

### Example 3:
**Input:** `nums = [5, 4, -1, 7, 8]`
**Output:** `23`
**Subarray:** Entire array [5, 4, -1, 7, 8]
**Explanation:** Even with -1 in middle, total is positive.

### Example 4:
**Input:** `nums = [-2, -1]`
**Output:** `-1`
**Explanation:** We must pick at least one element; -1 is the max.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 10⁵ |
| Element Range | -10⁴ ≤ nums[i] ≤ 10⁴ |
| Data Type | Integer array |
| Special Conditions | Must include at least one element |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Maximum sum integer |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Goldman Sachs | 🟢 Citadel |
| 🔵 Amazon | 🟡 JPMorgan | 🟢 DE Shaw |
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Tower Research |
| 🔵 Microsoft | 🟡 Morgan Stanley | 🟢 Jane Street |

---

## Follow-up Questions

1. How would you return the actual subarray indices?
2. What if the array is circular (can wrap around)?
3. How would you find maximum product subarray instead?
4. Can you solve this using divide and conquer?
