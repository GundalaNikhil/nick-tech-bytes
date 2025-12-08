# First Missing Positive

## Problem Description

**Real-World Scenario:**
A hospital assigns patient IDs starting from 1. After some patients leave, find the first available (missing) ID to assign to the next patient.

**Example Setup:** 
A parking lot tracks which numbered spots are taken. Find the smallest available spot number.

**What is First Missing Positive?**
Given an unsorted array, find the smallest positive integer that is missing. Must be O(n) time and O(1) extra space!

**Why is it important?**
- Index-as-hash technique
- Cyclic sort pattern
- Space constraint challenge
- Very common interview question

**Your Task:** 
Return the smallest missing positive integer.

**Difficulty:** Medium
**Tags:** Array, Basic Operations, Index-As-Hash, Cyclic Sort Pattern, Space Constraint Challenge, Very Common Interview Question, O(n), Interview

---

## Examples

### Example 1:
**Input:** `nums = [1, 2, 0]`
**Output:** `3`
**Explanation:** 1 and 2 exist, 3 is missing.

### Example 2:
**Input:** `nums = [3, 4, -1, 1]`
**Output:** `2`
**Explanation:** 1 exists, 2 is missing.

### Example 3:
**Input:** `nums = [7, 8, 9, 11, 12]`
**Output:** `1`
**Explanation:** 1 is the first positive.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 10⁵ |
| Element Range | -2³¹ ≤ nums[i] ≤ 2³¹-1 |
| Data Type | Integer array |
| Special Conditions | O(n) time, O(1) extra space |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Smallest missing positive |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Epic |
| 🔵 Google | 🟡 Uber | 🟢 Cerner |
| 🔵 Microsoft | 🟡 Apple | 🟢 Medidata |

---

## Follow-up Questions

1. Why place nums[i] at index nums[i]-1?
2. How do you handle negatives and large numbers?
3. What's cyclic sort approach?
4. Why is answer always in [1, n+1]?
