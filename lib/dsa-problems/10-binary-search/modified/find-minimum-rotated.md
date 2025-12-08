# Find Minimum in Rotated Sorted Array

## Problem Description

**Real-World Scenario:**
A circular time-series database stores entries sorted by timestamp, but the buffer wraps around at midnight. Finding the minimum helps identify where the "day starts".

**Example Setup:** 
A playlist on repeat has songs sorted by duration, but starting from the middle. Find where the "smallest song" is to reset the playlist correctly.

**What is Find Minimum in Rotated Sorted Array?**
Given a sorted array that's been rotated at some pivot, find the minimum element in O(log n) time.

**Why is it important?**
- Modified binary search
- Pivot finding
- Prerequisite for search in rotated array
- Circular data structures

**Your Task:** 
Find the minimum element.

---

## Examples

### Example 1:
**Input:** `nums = [3, 4, 5, 1, 2]`
**Output:** `1`
**Explanation:** Original sorted array [1,2,3,4,5] rotated at pivot 1.

### Example 2:
**Input:** `nums = [4, 5, 6, 7, 0, 1, 2]`
**Output:** `0`
**Explanation:** Original [0,1,2,4,5,6,7] rotated at 0's position.

### Example 3:
**Input:** `nums = [11, 13, 15, 17]`
**Output:** `11`
**Explanation:** Not rotated (or rotated by 0).

### Example 4:
**Input:** `nums = [2, 1]`
**Output:** `1`
**Explanation:** Simple rotation.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 5000 |
| Element Range | -5000 ≤ nums[i] ≤ 5000 |
| Data Type | Unique integers |
| Special Conditions | Originally sorted ascending |
| Time Complexity | O(log n) |
| Space Complexity | O(1) |
| Output Format | Minimum integer |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Expedia |
| 🔵 Amazon | 🟡 Uber | 🟢 Nvidia |
| 🔵 Microsoft | 🟡 Goldman Sachs | 🟢 Splunk |

---

## Follow-up Questions

1. How do you determine which half has the minimum?
2. What if duplicates are allowed?
3. How is this related to finding the pivot/rotation point?
4. Can you find maximum similarly?
