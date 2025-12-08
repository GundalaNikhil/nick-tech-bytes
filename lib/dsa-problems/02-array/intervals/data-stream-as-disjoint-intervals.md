# Data Stream as Disjoint Intervals

## Problem Description

**Real-World Scenario:**
A network monitor receiving packets out of order and maintaining a list of contiguous received ranges (e.g., [1, 3], [5, 5], [7, 9]).

**Example Setup:** 
Tracking available seats in a cinema as they are booked/released.

**What is Data Stream as Disjoint Intervals?**
Given a data stream input of non-negative integers `a1, a2, ..., an`, summarize the numbers seen so far as a list of disjoint intervals.
Implement the `SummaryRanges` class:
- `SummaryRanges()` Initializes the object with an empty stream.
- `void addNum(int value)` Adds the integer `value` to the stream.
- `int[][] getIntervals()` Returns a summary of the integers in the stream currently as a list of disjoint intervals `[starti, endi]`. The answer should be sorted by `starti`.

**Why is it important?**
- TreeMap / SortedSet
- Interval Merging (Dynamic)
- Binary Search Tree

**Your Task:** 
Implement the class.

---

## Examples

### Example 1:
**Input:** 
`addNum(1)`
`getIntervals()` -> [[1, 1]]
`addNum(3)`
`getIntervals()` -> [[1, 1], [3, 3]]
`addNum(7)`
`getIntervals()` -> [[1, 1], [3, 3], [7, 7]]
`addNum(2)`
`getIntervals()` -> [[1, 3], [7, 7]]
`addNum(6)`
`getIntervals()` -> [[1, 3], [6, 7]]

---

## Constraints

| Constraint | Value |
|------------|-------|
| Calls | At most 3 * 10^4 calls |
| Values | 0 ≤ value ≤ 10^4 |
| Time Complexity | O(log N) per add |
| Space Complexity | O(N) |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Yandex |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Baidu |
| 🔵 Facebook | 🟡 Apple | 🟢 Alibaba |

---

## Follow-up Questions

1. Why TreeMap? (Find floor and ceiling keys efficiently).
2. Merge cases? (Merge with prev? Merge with next? Merge with both?).
3. What if lots of merges? (TreeMap handles it in O(log N)).
