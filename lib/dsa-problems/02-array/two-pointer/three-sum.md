# 3Sum

## Problem Description

**Real-World Scenario:**
A chemistry lab needs to find combinations of three reagents that neutralize (sum to zero). Given the pH values of available reagents, find all unique triplets that combine to pH neutral.

**Example Setup:** 
A bank's fraud detection system looks for suspicious transaction patterns. Given a list of transaction amounts (positive deposits, negative withdrawals), find all triplets of transactions that suspiciously sum to zero.

**What is 3Sum?**
Given an array, find all unique triplets (a, b, c) such that a + b + c = 0. This extends Two Sum with an extra dimension.

**Why is it important?**
- Extends Two Sum concept
- Two-pointer after sorting
- Handling duplicates
- Foundation for 4Sum, kSum

**Your Task:** 
Return all unique triplets that sum to zero.

**Difficulty:** Medium
**Tags:** Array, Two Pointer, Extends Two Sum Concept, Two-Pointer After Sorting, Handling Duplicates, Foundation For 4Sum, Ksum, O(n²), Interview

---

## Examples

### Example 1:
**Input:** `nums = [-1, 0, 1, 2, -1, -4]`
**Output:** `[[-1, -1, 2], [-1, 0, 1]]`
**Explanation:** Two triplets sum to 0.

### Example 2:
**Input:** `nums = [0, 1, 1]`
**Output:** `[]`
**Explanation:** No triplet sums to 0.

### Example 3:
**Input:** `nums = [0, 0, 0]`
**Output:** `[[0, 0, 0]]`
**Explanation:** Only triplet of zeros.

### Example 4:
**Input:** `nums = [-2, 0, 1, 1, 2]`
**Output:** `[[-2, 0, 2], [-2, 1, 1]]`
**Explanation:** Two unique triplets.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 3 ≤ n ≤ 3000 |
| Element Range | -10⁵ ≤ nums[i] ≤ 10⁵ |
| Data Type | Integer array |
| Special Conditions | No duplicate triplets in output |
| Time Complexity | O(n²) |
| Space Complexity | O(1) extra (excluding output) |
| Output Format | List of triplets |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Qualtrics |
| 🔵 Amazon | 🟡 Adobe | 🟢 Visa |
| 🔵 Google | 🟡 Uber | 🟢 VMware |
| 🔵 Microsoft | 🟡 Oracle | 🟢 Cisco |

---

## Follow-up Questions

1. How do you avoid duplicate triplets?
2. What's the approach: sort + two pointers?
3. How would you extend to 4Sum or general kSum?
4. Can you optimize for specific distributions of numbers?
