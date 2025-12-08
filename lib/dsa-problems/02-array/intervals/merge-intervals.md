# Merge Intervals

## Problem Description

**Real-World Scenario:**
A meeting room booking system merging consecutive or overlapping bookings to show "busy" blocks.

**Example Setup:** 
Consolidating time ranges from multiple logs.

**What is Merge Intervals?**
Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

**Why is it important?**
- Sorting
- Interval Logic
- Greedy

**Your Task:** 
Return list of merged intervals.

---

## Examples

### Example 1:
**Input:** `intervals = [[1,3],[2,6],[8,10],[15,18]]`
**Output:** `[[1,6],[8,10],[15,18]]`
**Explanation:** Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

### Example 2:
**Input:** `intervals = [[1,4],[4,5]]`
**Output:** `[[1,5]]`
**Explanation:** Intervals [1,4] and [4,5] are considered overlapping.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Intervals (n) | 1 ≤ n ≤ 10^4 |
| Time Complexity | O(N log N) |
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

1. Why sort by start time? (Ensures we only need to check overlap with the *previous* merged interval).
2. Overlap condition? `current.start <= previous.end`.
3. Merge logic? `previous.end = max(previous.end, current.end)`.
