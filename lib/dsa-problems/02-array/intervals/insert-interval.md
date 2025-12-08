# Insert Interval

## Problem Description

**Real-World Scenario:**
A calendar app inserting a new meeting into a sorted list of existing meetings, merging overlaps if necessary.

**Example Setup:** 
Adding a new task to a schedule.

**What is Insert Interval?**
You are given an array of non-overlapping intervals `intervals` where `intervals[i] = [starti, endi]` represent the start and the end of the `i-th` interval and `intervals` is sorted in ascending order by `starti`. You are also given an interval `newInterval = [start, end]` that represents the start and end of another interval.
Insert `newInterval` into `intervals` such that `intervals` is still sorted in ascending order by `starti` and `intervals` still does not have any overlapping intervals (merge overlapping intervals if necessary).
Return `intervals` after the insertion.

**Why is it important?**
- Array / Interval Manipulation
- Sorting (Already sorted)
- Merge Logic

**Your Task:** 
Return list of intervals.

---

## Examples

### Example 1:
**Input:** `intervals = [[1,3],[6,9]], newInterval = [2,5]`
**Output:** `[[1,5],[6,9]]`

### Example 2:
**Input:** `intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]`
**Output:** `[[1,2],[3,10],[12,16]]`
**Explanation:** Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

---

## Constraints

| Constraint | Value |
|------------|-------|
| Intervals (n) | 0 ≤ n ≤ 10^4 |
| Values | 0 ≤ start ≤ end ≤ 10^5 |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | List of Lists |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 LinkedIn |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Twitter |
| 🔵 Facebook | 🟡 Apple | 🟢 Uber |

---

## Follow-up Questions

1. Three stages of iteration? (Before overlap, Overlapping, After overlap).
2. How to merge? `newStart = min(s, newStart)`, `newEnd = max(e, newEnd)`.
3. Can you do it in-place? (Hard with array, easy with Linked List).
