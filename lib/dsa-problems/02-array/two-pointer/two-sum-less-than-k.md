# Two Sum Less Than K

## Problem Description

**Real-World Scenario:**
A charity sets a maximum donation amount K. Find the closest sum of exactly two donations that stays under the budget limit.

**Example Setup:** 
A shopping app shows "combinations under your budget". Given item prices and budget K, find the pair with maximum total that's still under K.

**What is Two Sum Less Than K?**
Given an array and target K, find the maximum sum of two elements that is less than K. Return -1 if no such pair exists.

**Why is it important?**
- Two-pointer variant
- Constraint optimization
- Shopping/budget apps
- Closest to target problems

**Your Task:** 
Return the maximum sum less than K.

**Difficulty:** Medium
**Tags:** Array, Two Pointer, Two-Pointer Variant, Constraint Optimization, Shopping/Budget Apps, Closest To Target Problems, O(n log n), Interview

---

## Examples

### Example 1:
**Input:** `nums = [34, 23, 1, 24, 75, 33, 54, 8], k = 60`
**Output:** `58`
**Explanation:** 34 + 24 = 58 < 60.

### Example 2:
**Input:** `nums = [10, 20, 30], k = 15`
**Output:** `-1`
**Explanation:** No pair sums to less than 15.

### Example 3:
**Input:** `nums = [1, 2, 3, 4], k = 10`
**Output:** `7`
**Explanation:** 3 + 4 = 7 < 10.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 100 |
| Element Value | 1 ≤ nums[i] ≤ 1000 |
| K Value | 1 ≤ k ≤ 2000 |
| Data Type | Integer array |
| Time Complexity | O(n log n) |
| Space Complexity | O(1) |
| Output Format | Maximum sum or -1 |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Wish |
| 🔵 Facebook | 🟡 Uber | 🟢 Shopify |
| 🔵 Google | 🟡 Apple | 🟢 Etsy |

---

## Follow-up Questions

1. Why sort first?
2. How does two-pointer approach work here?
3. What about exactly K (Two Sum)?
4. What about closest to K?
