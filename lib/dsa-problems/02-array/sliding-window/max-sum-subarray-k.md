# Maximum Sum Subarray of Size K

## Problem Description

**Real-World Scenario:**
A streaming service tracks daily active users. The marketing team wants to find the best consecutive K-day period with the highest total user engagement for their campaign report.

**Example Setup:** 
A restaurant tracks daily revenue. The owner wants to identify the best 7-day period (any week) with maximum total revenue to understand peak performance patterns.

**What is Maximum Sum Subarray of Size K?**
Given an array and a number K, find the maximum sum of any contiguous subarray of size K. This is the foundation of the sliding window technique.

**Why is it important?**
- Core sliding window problem
- Time series analysis
- Moving average calculations
- Teaches window expansion/contraction

**Your Task:** 
Find the maximum sum of any contiguous subarray of size K.

**Difficulty:** Medium
**Tags:** Array, Sliding Window, Core Sliding Window, Time Series Analysis, Moving Average Calculations, Teaches Window Expansion/Contraction, O(n), Interview

---

## Examples

### Example 1:
**Input:** `nums = [2, 1, 5, 1, 3, 2], k = 3`
**Output:** `9`
**Explanation:** Subarray [5, 1, 3] has sum 9.

### Example 2:
**Input:** `nums = [2, 3, 4, 1, 5], k = 2`
**Output:** `7`
**Explanation:** Subarray [3, 4] has sum 7.

### Example 3:
**Input:** `nums = [1, 1, 1, 1, 1], k = 3`
**Output:** `3`
**Explanation:** All windows have same sum.

### Example 4:
**Input:** `nums = [5], k = 1`
**Output:** `5`
**Explanation:** Only one window possible.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 10⁵ |
| K Value | 1 ≤ k ≤ n |
| Element Range | -10⁴ ≤ nums[i] ≤ 10⁴ |
| Special Conditions | Fixed window size |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Maximum sum integer |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Netflix |
| 🔵 Google | 🟡 Uber | 🟢 Spotify |
| 🔵 Facebook | 🟡 Salesforce | 🟢 Stripe |

---

## Follow-up Questions

1. What if K is larger than the array?
2. How does sliding window achieve O(n)?
3. Can you find the subarray indices too?
4. What if you need minimum instead of maximum?
