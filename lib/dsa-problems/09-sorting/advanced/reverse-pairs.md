# Reverse Pairs

## Problem Description

**Real-World Scenario:**
A traffic monitoring system detects "significant slowdowns" where the speed at an earlier point is more than twice the speed at a later point.

**Example Setup:** 
A database query optimizer finds pairs of records where one value dominates another by a factor of 2.

**What is Reverse Pairs?**
Given an integer array `nums`, return the number of reverse pairs in the array. A reverse pair is a pair `(i, j)` where:
- `0 <= i < j < nums.length`
- `nums[i] > 2 * nums[j]`

**Why is it important?**
- Merge Sort modification
- Binary Indexed Tree (BIT)
- Inversion counting variant
- Hard sorting problem

**Your Task:** 
Return the count of reverse pairs.

**Difficulty:** Hard
**Tags:** Sorting, Advanced, Merge Sort Modification, Binary Indexed Tree, Inversion Counting Variant, Hard Sorting, O(n log n), Interview

---

## Examples

### Example 1:
**Input:** `nums = [1,3,2,3,1]`
**Output:** `2`
**Explanation:** Pairs are (1, 4) -> 3 > 2*1 and (3, 4) -> 3 > 2*1.

### Example 2:
**Input:** `nums = [2,4,3,5,1]`
**Output:** `3`
**Explanation:** (1, 4) -> 4 > 2*1, (2, 4) -> 3 > 2*1, (3, 4) -> 5 > 2*1.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ nums.length ≤ 5 × 10⁴ |
| Element Value | -2³¹ ≤ nums[i] ≤ 2³¹-1 |
| Data Type | Integer array (use Long for comparison) |
| Time Complexity | O(n log n) |
| Space Complexity | O(n) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Yandex |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Tencent |
| 🔵 Facebook | 🟡 Apple | 🟢 ByteDance |

---

## Follow-up Questions

1. Why is this similar to "Count Inversions"?
2. Why do we need a separate loop for counting before merging?
3. How to handle integer overflow during `2 * nums[j]`?
4. Can you solve it using a Segment Tree?
