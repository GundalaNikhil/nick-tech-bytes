# Find First and Last Position of Element in Sorted Array

## Problem Description

**Real-World Scenario:**
A library database finds the range of books by a specific author in a sorted catalog. Given an author code, find the first and last occurrence.

**Example Setup:** 
A log analyzer finds the time range of specific events in a sorted log file.

**What is Find First and Last Position?**
Given a sorted array and target, find the starting and ending position of the target. Return [-1, -1] if not found. Must be O(log n) time.

**Why is it important?**
- Binary search variants
- Finding range bounds
- Database range queries
- Efficient counting

**Your Task:** 
Return [first, last] position of target.

---

## Examples

### Example 1:
**Input:** `nums = [5,7,7,8,8,10], target = 8`
**Output:** `[3, 4]`
**Explanation:** 8 appears at indices 3 and 4.

### Example 2:
**Input:** `nums = [5,7,7,8,8,10], target = 6`
**Output:** `[-1, -1]`
**Explanation:** 6 not found.

### Example 3:
**Input:** `nums = [], target = 0`
**Output:** `[-1, -1]`
**Explanation:** Empty array.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 0 ≤ n ≤ 10⁵ |
| Element Range | -10⁹ ≤ nums[i] ≤ 10⁹ |
| Data Type | Sorted integer array |
| Special Conditions | O(log n) required |
| Time Complexity | O(log n) |
| Space Complexity | O(1) |
| Output Format | [first, last] |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Elastic |
| 🔵 Amazon | 🟡 LinkedIn | 🟢 Splunk |
| 🔵 Google | 🟡 Microsoft | 🟢 MongoDB |

---

## Follow-up Questions

1. How do you find leftmost occurrence with binary search?
2. How do you find rightmost?
3. What's the relationship to lower_bound/upper_bound?
4. How to count occurrences in O(log n)?
