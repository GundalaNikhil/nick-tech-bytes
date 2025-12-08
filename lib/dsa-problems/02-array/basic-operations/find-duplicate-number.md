# Find the Duplicate Number

## Problem Description

**Real-World Scenario:**
A ticket system issues n-1 unique tickets numbered 1 to n-1, but one number was used twice. Find the duplicate without modifying the database.

**Example Setup:** 
A student ID system has n slots but n+1 entries. One ID was assigned twice. Find it in O(1) space.

**What is Find the Duplicate Number?**
Given an array of n+1 integers where each is in [1, n], exactly one number appears twice. Find it without modifying the array, using O(1) space.

**Why is it important?**
- Floyd's cycle detection
- Linked list cycle in array form
- Space constraint challenge
- Pigeonhole principle

**Your Task:** 
Return the duplicate number.

**Difficulty:** Medium
**Tags:** Array, Basic Operations, Floyd'S Cycle Detection, Linked List Cycle In Array Form, Space Constraint Challenge, Pigeonhole Principle, O(n), Interview

---

## Examples

### Example 1:
**Input:** `nums = [1, 3, 4, 2, 2]`
**Output:** `2`
**Explanation:** 2 appears twice.

### Example 2:
**Input:** `nums = [3, 1, 3, 4, 2]`
**Output:** `3`
**Explanation:** 3 appears twice.

### Example 3:
**Input:** `nums = [1, 1]`
**Output:** `1`
**Explanation:** 1 appears twice.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | n+1 elements |
| Element Range | 1 to n |
| Data Type | Integer array |
| Special Conditions | Cannot modify array, O(1) space |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Duplicate integer |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Palantir |
| 🔵 Microsoft | 🟡 Uber | 🟢 Tableau |
| 🔵 Google | 🟡 LinkedIn | 🟢 Splunk |

---

## Follow-up Questions

1. How does Floyd's tortoise-hare work here?
2. Why does treating array as linked list work?
3. What if modification was allowed (mark negatives)?
4. Can you use binary search on value range?
