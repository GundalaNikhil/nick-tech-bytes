# Advantage Shuffle

## Problem Description

**Real-World Scenario:**
A card player rearranges their hand to win the maximum number of rounds against an opponent's fixed hand (higher card wins).

**Example Setup:** 
A sports team coach assigns defenders to attackers to win the most individual matchups based on skill ratings.

**What is Advantage Shuffle?**
You are given two integer arrays `nums1` and `nums2` both of the same length. The advantage of `nums1` with respect to `nums2` is the number of indices `i` for which `nums1[i] > nums2[i]`. Return any permutation of `nums1` that maximizes its advantage with respect to `nums2`.

**Why is it important?**
- Greedy Strategy
- Sorting + Two Pointers
- TreeMap application
- Optimization

**Your Task:** 
Return the optimized permutation.

**Difficulty:** Medium
**Tags:** Greedy, Array, Greedy Strategy, Sorting + Two Pointers, Treemap Application, Optimization, O(n log n), Interview

---

## Examples

### Example 1:
**Input:** `nums1 = [2,7,11,15], nums2 = [1,10,4,11]`
**Output:** `[2,11,7,15]`
**Explanation:** 
2 > 1 (Win)
11 > 10 (Win)
7 > 4 (Win)
15 > 11 (Win)
All 4 wins.

### Example 2:
**Input:** `nums1 = [12,24,8,32], nums2 = [13,25,32,11]`
**Output:** `[24,32,8,12]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 10⁵ |
| Element Value | 0 ≤ nums[i] ≤ 10⁹ |
| Data Type | Integer arrays |
| Time Complexity | O(n log n) |
| Space Complexity | O(n) |
| Output Format | Permuted array |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 DraftKings |
| 🔵 Amazon | 🟡 Apple | 🟢 FanDuel |
| 🔵 Facebook | 🟡 Microsoft | 🟢 EA |

---

## Follow-up Questions

1. Why sort `nums1`?
2. Why sort `nums2` but keep track of original indices?
3. What is the greedy choice: smallest winner vs smallest loser?
4. If `min(nums1) > min(nums2)`, use it. Else, sacrifice `min(nums1)` against `max(nums2)`. Why?
