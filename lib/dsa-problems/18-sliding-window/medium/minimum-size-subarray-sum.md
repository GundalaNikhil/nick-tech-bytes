# Minimum Size Subarray Sum

## Problem Description

**Real-World Scenario:**
A budget planner wants to find the shortest period of time where expenses exceeded a certain threshold.

**Example Setup:** 
Finding the smallest team of people whose combined weight exceeds the elevator limit.

**What is Minimum Size Subarray Sum?**
Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a subarray whose sum is greater than or equal to `target`. If there is no such subarray, return `0` instead.

**Why is it important?**
- Sliding Window (Variable Size)
- Two Pointers
- Prefix Sum + Binary Search (O(N log N) alternative)

**Your Task:** 
Return min length.

---

## Examples

### Example 1:
**Input:** `target = 7, nums = [2,3,1,2,4,3]`
**Output:** `2`
**Explanation:** The subarray [4,3] has the minimal length under the problem constraint.

### Example 2:
**Input:** `target = 4, nums = [1,4,4]`
**Output:** `1`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 10^5 |
| Target | 1 ≤ target ≤ 10^9 |
| Time Complexity | O(N) |
| Space Complexity | O(1) |
| Output Format | Integer length |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Goldman Sachs |
| 🔵 Amazon | 🟡 Microsoft | 🟢 JP Morgan |
| 🔵 Facebook | 🟡 Apple | 🟢 Morgan Stanley |

---

## Follow-up Questions

1. Why O(N)? (Each element added and removed at most once).
2. O(N log N) solution? (Prefix sums + Binary Search for each start index).
3. What if numbers can be negative? (Sliding window fails, need Deque or Prefix Sum + Map).
