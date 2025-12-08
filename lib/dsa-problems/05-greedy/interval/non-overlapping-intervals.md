# Non-overlapping Intervals

## Problem Description

**Real-World Scenario:**
A conference room scheduler minimizes booking cancellations to avoid overlapping meetings.

**Example Setup:** 
A satellite ground station schedules non-overlapping transmission windows, removing minimum events to avoid conflicts.

**What is Non-overlapping Intervals?**
Given intervals, find the minimum number of intervals to remove to make the rest non-overlapping.

**Why is it important?**
- Greedy interval scheduling
- Activity selection variant
- Meeting room optimization
- Maximum compatible set

**Your Task:** 
Return minimum number of intervals to remove.

**Difficulty:** Medium
**Tags:** Greedy, Interval, Greedy Interval Scheduling, Activity Selection Variant, Meeting Room Optimization, Maximum Compatible Set, O(n log n), Interview

---

## Examples

### Example 1:
**Input:** `intervals = [[1,2],[2,3],[3,4],[1,3]]`
**Output:** `1`
**Explanation:** Remove [1,3] and others don't overlap.

### Example 2:
**Input:** `intervals = [[1,2],[1,2],[1,2]]`
**Output:** `2`
**Explanation:** Keep one, remove two.

### Example 3:
**Input:** `intervals = [[1,2],[2,3]]`
**Output:** `0`
**Explanation:** Already non-overlapping.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Intervals | 1 ≤ n ≤ 10⁵ |
| Range | -5×10⁴ ≤ start < end ≤ 5×10⁴ |
| Data Type | Integer pairs |
| Special Conditions | Counting removals |
| Time Complexity | O(n log n) |
| Space Complexity | O(1) after sorting |
| Output Format | Minimum removals |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 SpaceX |
| 🔵 Amazon | 🟡 Uber | 🟢 Lockheed |
| 🔵 Google | 🟡 Apple | 🟢 Boeing |

---

## Follow-up Questions

1. Why sort by end time?
2. How is this related to Activity Selection?
3. Why keep interval with earliest end?
4. What's the minimum kept = n - removed?
