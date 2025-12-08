# Patching Array

## Problem Description

**Real-World Scenario:**
A currency system designer wants to add the minimum number of coin denominations to ensure all values up to a target sum can be formed.

**Example Setup:** 
A weight set manufacturer adds weights to a set to ensure all integer weights up to n can be measured.

**What is Patching Array?**
Given a sorted integer array `nums` and an integer `n`, add/patch elements to the array such that any number in the range `[1, n]` inclusive can be formed by the sum of some elements in the array. Return the minimum number of patches required.

**Why is it important?**
- Greedy strategy
- Mathematical insight (range coverage)
- Constructive algorithm
- Optimization

**Your Task:** 
Return minimum patches.

**Difficulty:** Medium
**Tags:** Greedy, Array, Greedy Strategy, Mathematical Insight, Constructive, Optimization, O(m + log n), Interview

---

## Examples

### Example 1:
**Input:** `nums = [1,3], n = 6`
**Output:** `1`
**Explanation:**
Combinations of [1,3] are 1, 3, 4.
Missing: 2, 5, 6.
Add 2. nums = [1,2,3].
Sums: 1, 2, 3, 1+2=3, 1+3=4, 2+3=5, 1+2+3=6.
Covered [1, 6].

### Example 2:
**Input:** `nums = [1,5,10], n = 20`
**Output:** `2`
**Explanation:** Add 2, 4.

### Example 3:
**Input:** `nums = [1,2,2], n = 5`
**Output:** `0`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ nums.length ≤ 1000 |
| Element Value | 1 ≤ nums[i] ≤ 10⁴ |
| N Value | 1 ≤ n ≤ 2³¹-1 |
| Data Type | Sorted integer array |
| Time Complexity | O(m + log n) |
| Space Complexity | O(1) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Stripe |
| 🔵 Amazon | 🟡 Apple | 🟢 Square |
| 🔵 Facebook | 🟡 Microsoft | 🟢 PayPal |

---

## Follow-up Questions

1. Why do we track the `miss` variable (smallest missing sum)?
2. Why add `miss` itself when patching?
3. How does the range `[1, miss)` expand to `[1, 2*miss)`?
4. Why is the array sorted?
