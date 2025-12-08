# Minimum Window Sort

## Problem Description

**Real-World Scenario:**
A database query optimizer finds the minimum range of records that need reordering to sort the entire table.

**Example Setup:** 
A playlist editor identifies the shortest section that must be rearranged to make the entire playlist sorted by song duration.

**What is Minimum Window Sort?**
Find the length of the shortest subarray that, if sorted, would make the entire array sorted.

**Why is it important?**
- Array boundary detection
- Sorting optimization
- Partial sort problems
- Database operations

**Your Task:** 
Return the length of the shortest such subarray.

**Difficulty:** Medium
**Tags:** Sorting, Applications, Array Boundary Detection, Sorting Optimization, Partial Sort Problems, Database Operations, O(n), Interview

---

## Examples

### Example 1:
**Input:** `nums = [2, 6, 4, 8, 10, 9, 15]`
**Output:** `5`
**Explanation:** Sort [6, 4, 8, 10, 9] to fix the array.

### Example 2:
**Input:** `nums = [1, 2, 3, 4]`
**Output:** `0`
**Explanation:** Already sorted.

### Example 3:
**Input:** `nums = [1]`
**Output:** `0`
**Explanation:** Single element is sorted.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 10⁴ |
| Element Value | -10⁵ ≤ nums[i] ≤ 10⁵ |
| Data Type | Integer array |
| Special Conditions | May have duplicates |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Length integer |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Snowflake |
| 🔵 Amazon | 🟡 Uber | 🟢 Databricks |
| 🔵 Google | 🟡 Adobe | 🟢 MongoDB |

---

## Follow-up Questions

1. How do you find the left and right boundaries?
2. Why scan for min/max in the unsorted region?
3. Can you use sorting to verify?
4. What if you need to return the indices?
