# Meeting Rooms II

## Problem Description

**Real-World Scenario:**
A conference center manager needs to determine the minimum number of rooms required to host a set of scheduled meetings.

**Example Setup:** 
Allocating platforms at a train station for arriving/departing trains.

**What is Meeting Rooms II?**
Given an array of meeting time intervals `intervals` where `intervals[i] = [starti, endi]`, return the minimum number of conference rooms required.

**Why is it important?**
- Heap / Priority Queue (Min Heap)
- Sorting (Start and End times separately)
- Sweep Line Algorithm

**Your Task:** 
Return min rooms.

---

## Examples

### Example 1:
**Input:** `intervals = [[0,30],[5,10],[15,20]]`
**Output:** `2`
**Explanation:** 
Room 1: [0, 30]
Room 2: [5, 10], [15, 20]

### Example 2:
**Input:** `intervals = [[7,10],[2,4]]`
**Output:** `1`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Intervals (n) | 1 ≤ n ≤ 10^4 |
| Time Complexity | O(N log N) |
| Space Complexity | O(N) |
| Output Format | Integer rooms |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Snapchat |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Uber |
| 🔵 Facebook | 🟡 Apple | 🟢 Lyft |

---

## Follow-up Questions

1. Why Min Heap? (Stores end times of active meetings. If new start >= min end, reuse room (pop)).
2. Why sort start times? (Process meetings in chronological order).
3. Sweep Line approach? (Sort all start/end points. +1 for start, -1 for end. Max prefix sum).
