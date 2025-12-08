# Create Maximum Number

## Problem Description

**Real-World Scenario:**
Merging two sorted sequences of digits to form the largest possible number while maintaining relative order (e.g., merging two high scores).

**Example Setup:** 
Constructing the best possible team from two candidate lists.

**What is Create Maximum Number?**
You are given two integer arrays `nums1` and `nums2` of lengths `m` and `n` respectively. `nums1` and `nums2` represent the digits of two numbers. You are also given an integer `k`.
Create the maximum number of length `k <= m + n` from digits of the two numbers. The relative order of the digits from the same array must be preserved.
Return an array of the `k` digits.

**Why is it important?**
- Greedy
- Monotonic Stack
- Merge Logic
- Hard Problem

**Your Task:** 
Return max number array.

---

## Examples

### Example 1:
**Input:** `nums1 = [3, 4, 6, 5], nums2 = [9, 1, 2, 5, 8, 3], k = 5`
**Output:** `[9, 8, 6, 5, 3]`

### Example 2:
**Input:** `nums1 = [6, 7], nums2 = [6, 0, 4], k = 5`
**Output:** `[6, 7, 6, 0, 4]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Lengths | 0 ≤ m, n ≤ 1000 |
| k | 0 ≤ k ≤ m + n |
| Time Complexity | O(K * (M+N)^2) |
| Space Complexity | O(K) |
| Output Format | Integer array |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Yandex |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Baidu |
| 🔵 Facebook | 🟡 Apple | 🟢 Alibaba |

---

## Follow-up Questions

1. Subproblem: Max number of length `i` from one array? (Use Monotonic Stack / Remove K Digits logic).
2. How to merge? (Compare arrays lexicographically to decide which one to pick from).
3. Why iterate `i` from `max(0, k-n)` to `min(k, m)`? (Try all split combinations of taking `i` from `nums1` and `k-i` from `nums2`).
