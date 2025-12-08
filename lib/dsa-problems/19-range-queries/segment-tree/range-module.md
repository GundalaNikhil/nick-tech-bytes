# Range Module

## Problem Description

**Real-World Scenario:**
A memory manager tracks allocated and free memory blocks. You need to add allocated ranges, remove freed ranges, and query if a specific range is fully allocated.

**Example Setup:** 
Calendar system tracking busy time slots.

**What is Range Module?**
A Range Module is a module that tracks ranges of numbers. Design a data structure to track the ranges represented as half-open intervals `[left, right)` (left inclusive, right exclusive).
Implement the `RangeModule` class:
- `RangeModule()` Initializes the object.
- `void addRange(int left, int right)` Adds the half-open interval `[left, right)`, tracking every real number in that interval. Adding an interval that partially overlaps with currently tracked numbers should add any numbers in the interval that are not currently tracked.
- `boolean queryRange(int left, int right)` Returns `true` if every real number in the interval `[left, right)` is currently being tracked.
- `void removeRange(int left, int right)` Stops tracking every real number currently being tracked in the interval `[left, right)`.

**Why is it important?**
- Segment Tree (Dynamic)
- TreeMap / SortedMap
- Interval Management

**Your Task:** 
Implement the class.

---

## Examples

### Example 1:
**Input:** 
`addRange(10, 20)`
`removeRange(14, 16)`
`queryRange(10, 14)` -> true
`queryRange(13, 15)` -> false
`queryRange(16, 17)` -> true

---

## Constraints

| Constraint | Value |
|------------|-------|
| Range | 1 ≤ left < right ≤ 10^9 |
| Calls | At most 10^4 calls |
| Time Complexity | O(log N) or O(N) depending on impl |
| Space Complexity | O(N) |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Intel |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Oracle |
| 🔵 Facebook | 🟡 Apple | 🟢 Adobe |

---

## Follow-up Questions

1. Why use a TreeMap (Java) or map (C++)? (To store disjoint intervals sorted by start).
2. How to handle merging intervals? (Iterate and merge overlapping intervals).
3. Segment Tree approach? (Dynamic Segment Tree since range is 10^9).
