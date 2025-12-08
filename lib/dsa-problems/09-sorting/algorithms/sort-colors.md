# Sort Colors (Dutch National Flag)

## Problem Description

**Real-World Scenario:**
A recycling plant sorts items into three bins: glass (0), plastic (1), metal (2). A conveyor belt should group items in one pass without counting first.

**Example Setup:** 
A priority-based task queue sorts tasks into low (0), medium (1), high (2) priority groups in one pass.

**What is Sort Colors?**
Given an array with elements 0, 1, and 2, sort it in-place so all 0s come first, then 1s, then 2s. Use constant space and one pass.

**Why is it important?**
- Dutch National Flag algorithm
- Three-way partitioning
- In-place sorting
- Quicksort foundation

**Your Task:** 
Sort the array in-place.

---

## Examples

### Example 1:
**Input:** `nums = [2, 0, 2, 1, 1, 0]`
**Output:** `[0, 0, 1, 1, 2, 2]`
**Explanation:** All 0s, then 1s, then 2s.

### Example 2:
**Input:** `nums = [2, 0, 1]`
**Output:** `[0, 1, 2]`
**Explanation:** One of each.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 300 |
| Element Value | 0, 1, or 2 |
| Data Type | Integer array |
| Special Conditions | One pass, O(1) space |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Modified array in-place |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Microsoft | 🟡 Bloomberg | 🟢 Nvidia |
| 🔵 Facebook | 🟡 Adobe | 🟢 Qualcomm |
| 🔵 Amazon | 🟡 Uber | 🟢 Intel |

---

## Follow-up Questions

1. Why use three pointers (low, mid, high)?
2. How is this related to quicksort's partition?
3. What if there were 4 colors?
4. Can you solve with counting (not one pass)?
