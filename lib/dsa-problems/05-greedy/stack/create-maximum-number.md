# Create Maximum Number

## Problem Description

**Real-World Scenario:**
A data analyst selects digits from two data streams to form the largest possible number while preserving relative order within each stream.

**Example Setup:** 
A card player picks k cards from two hands to form the highest possible rank sequence.

**What is Create Maximum Number?**
Given two arrays of length m and n with digits 0-9 representing two numbers. Create the maximum number of length k <= m + n from digits of the two. The relative order of the digits from the same array must be preserved.

**Why is it important?**
- Greedy + Stack
- Merge logic
- Subproblem decomposition
- Hard greedy problem

**Your Task:** 
Return the maximum number as an array of digits.

---

## Examples

### Example 1:
**Input:** `nums1 = [3,4,6,5], nums2 = [9,1,2,5,8,3], k = 5`
**Output:** `[9,8,6,5,3]`

### Example 2:
**Input:** `nums1 = [6,7], nums2 = [6,0,4], k = 5`
**Output:** `[6,7,6,0,4]`

### Example 3:
**Input:** `nums1 = [3,9], nums2 = [8,9], k = 3`
**Output:** `[9,8,9]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Sizes | 0 ≤ m, n ≤ 1000 |
| K Value | 0 ≤ k ≤ m + n |
| Digits | 0-9 |
| Time Complexity | O(k * (m + n)^2) or O((m+n)^3) |
| Space Complexity | O(k) |
| Output Format | Integer array |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Palantir |
| 🔵 Amazon | 🟡 Microsoft | 🟢 ByteDance |
| 🔵 Facebook | 🟡 Apple | 🟢 Tencent |

---

## Follow-up Questions

1. How do you find the max subsequence of length i from one array?
2. How do you merge two subsequences to get max number?
3. Why do you need to try all split points (i from nums1, k-i from nums2)?
4. How does the monotonic stack help in finding max subsequence?
