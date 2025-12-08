# Minimum in Rotated Sorted Array II (with Duplicates)

## Problem Description

**Real-World Scenario:**
A database index is rotated for archiving. Find the minimum value when duplicates exist (e.g., sensor readings with repeated values).

**Example Setup:** 
A circular log with repeated entries needs to find the oldest entry after rotation.

**What is Find Minimum in Rotated Sorted Array II?**
Like Find Minimum I, but array may contain duplicates. Find the minimum element. Worst case O(n) when all elements equal.

**Why is it important?**
- Binary search with duplicates
- Handling ambiguous cases
- Robust search
- Edge case mastery

**Your Task:** 
Return the minimum element.

---

## Examples

### Example 1:
**Input:** `nums = [2,2,2,0,1]`
**Output:** `0`

### Example 2:
**Input:** `nums = [1,3,3]`
**Output:** `1`

### Example 3:
**Input:** `nums = [3,3,1,3]`
**Output:** `1`
**Explanation:** Ambiguous case requires linear fallback.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 5000 |
| Element Range | -5000 ≤ nums[i] ≤ 5000 |
| Data Type | Integer array with duplicates |
| Special Conditions | Worst case O(n) |
| Time Complexity | O(log n) average, O(n) worst |
| Space Complexity | O(1) |
| Output Format | Minimum element |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Snowflake |
| 🔵 Microsoft | 🟡 Apple | 🟢 Databricks |
| 🔵 Facebook | 🟡 Uber | 🟢 MongoDB |

---

## Follow-up Questions

1. When does binary search fail?
2. How do you handle nums[mid] == nums[right]?
3. Why shrink right by 1 in ambiguous case?
4. What's the worst-case input?
