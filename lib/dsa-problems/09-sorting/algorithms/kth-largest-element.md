# Kth Largest Element in an Array

## Problem Description

**Real-World Scenario:**
A leaderboard shows the nth best score. Given all scores, find the kth largest without fully sorting.

**Example Setup:** 
A stock screener finds the kth most expensive stock. Quick select is faster than full sorting.

**What is Kth Largest Element?**
Find the kth largest element in an unsorted array. Use quickselect for average O(n) time.

**Why is it important?**
- Quickselect algorithm
- Partial sorting
- Order statistics
- Interview classic

**Your Task:** 
Return the kth largest element.

**Difficulty:** Medium
**Tags:** Sorting, Algorithms, Quickselect, Partial Sorting, Order Statistics, Interview Classic, O(n), Interview

---

## Examples

### Example 1:
**Input:** `nums = [3,2,1,5,6,4], k = 2`
**Output:** `5`
**Explanation:** Sorted: [6,5,4,3,2,1], 2nd largest is 5.

### Example 2:
**Input:** `nums = [3,2,3,1,2,4,5,5,6], k = 4`
**Output:** `4`
**Explanation:** 4th largest is 4.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 10⁵ |
| K Value | 1 ≤ k ≤ n |
| Element Range | -10⁴ ≤ nums[i] ≤ 10⁴ |
| Data Type | Integer array |
| Time Complexity | O(n) average with quickselect |
| Space Complexity | O(1) |
| Output Format | Kth largest integer |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Robinhood |
| 🔵 Amazon | 🟡 LinkedIn | 🟢 Fidelity |
| 🔵 Google | 🟡 Apple | 🟢 Schwab |

---

## Follow-up Questions

1. How does quickselect work?
2. What's the worst case and how to avoid it?
3. Can you use a heap for O(n log k)?
4. What's the difference from kth smallest?
