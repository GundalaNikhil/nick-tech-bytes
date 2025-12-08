# Search in Rotated Sorted Array

## Problem Description

**Real-World Scenario:**
A log rotation system stores events sorted by time. When the log reaches capacity, oldest entries wrap around to the beginning. The log becomes "rotated sorted" - you still need fast search in this unusual format.

**Example Setup:** 
A circular queue displays upcoming appointments by date. The queue starts from "today" but contains pre-sorted future dates. If dates wrap around (Dec → Jan), how do you quickly find a specific date?

**What is Search in Rotated Sorted Array?**
Given a sorted array that was rotated at some pivot, find a target value in O(log n) time. The rotation means [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2].

**Why is it important?**
- Modified binary search technique
- Real-world circular data structures
- Tests understanding of sorted invariants
- Common in log analysis

**Your Task:** 
Search for target in a rotated sorted array. Return its index or -1.

**Difficulty:** Medium
**Tags:** Binary Search, Modified, Modified Binary Search, Real-World Circular Data Structures, Tests Understanding Of Sorted Invariants, Common In Log Analysis, O(log n), Interview

---

## Examples

### Example 1:
**Input:** `nums = [4, 5, 6, 7, 0, 1, 2], target = 0`
**Output:** `4`
**Explanation:** Rotation pivot is at value 7. Target 0 is at index 4.

### Example 2:
**Input:** `nums = [4, 5, 6, 7, 0, 1, 2], target = 3`
**Output:** `-1`
**Explanation:** 3 doesn't exist in the array.

### Example 3:
**Input:** `nums = [1], target = 0`
**Output:** `-1`
**Explanation:** Single element, not the target.

### Example 4:
**Input:** `nums = [3, 1], target = 1`
**Output:** `1`
**Explanation:** Array rotated by 1, target at index 1.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 5000 |
| Element Range | -10⁴ ≤ nums[i] ≤ 10⁴ |
| Data Type | Integer array (rotated sorted) |
| Special Conditions | All values unique |
| Time Complexity | O(log n) required |
| Space Complexity | O(1) |
| Output Format | Index or -1 |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 LinkedIn | 🟢 Nvidia |
| 🔵 Amazon | 🟡 Uber | 🟢 Splunk |
| 🔵 Google | 🟡 Bloomberg | 🟢 Datadog |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Elastic |

---

## Follow-up Questions

1. What if duplicates are allowed?
2. How do you find the rotation point first?
3. What's the key insight for deciding which half to search?
4. Can you solve it in two passes (find pivot, then binary search)?
