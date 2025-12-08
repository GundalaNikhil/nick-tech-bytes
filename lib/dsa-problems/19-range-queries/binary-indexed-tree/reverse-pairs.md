# Reverse Pairs

## Problem Description

**Real-World Scenario:**
A fraud detection system flags transactions where a later transaction is significantly smaller (less than half) than an earlier transaction, indicating potential anomaly or refund abuse.

**Example Setup:** 
Counting significant inversions in a dataset.

**What is Reverse Pairs?**
Given an integer array `nums`, return the number of reverse pairs in the array.
A reverse pair is a pair `(i, j)` where:
- `0 <= i < j < nums.length` and
- `nums[i] > 2 * nums[j]`.

**Why is it important?**
- Merge Sort (Modified)
- Binary Indexed Tree
- Segment Tree
- Divide and Conquer

**Your Task:** 
Return count of reverse pairs.

---

## Examples

### Example 1:
**Input:** `nums = [1,3,2,3,1]`
**Output:** `2`
**Explanation:** (3, 1) -> 3 > 2*1. (3, 1) -> 3 > 2*1.

### Example 2:
**Input:** `nums = [2,4,3,5,1]`
**Output:** `3`
**Explanation:** (4, 1), (3, 1), (5, 1).

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 5 * 10^4 |
| Values | Integer range (use Long for 2*val) |
| Time Complexity | O(N log N) |
| Space Complexity | O(N) |
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

1. Why is this different from standard inversions? (Condition is `> 2*val` instead of `> val`).
2. Why does Merge Sort work? (Sort left and right, then count pairs across split, then merge).
3. Why do we need two passes in the merge step? (One to count, one to merge).
