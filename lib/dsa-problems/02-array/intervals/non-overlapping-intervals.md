# Non-overlapping Intervals

## Problem Description

**Real-World Scenario:**
A task scheduler selecting the maximum number of non-conflicting tasks to perform given a list of requested time slots.

**Example Setup:** 
Selecting the max number of events to attend.

**What is Non-overlapping Intervals?**
Given an array of intervals `intervals` where `intervals[i] = [starti, endi]`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

**Why is it important?**
- Greedy (Interval Scheduling)
- Sorting (By End Time vs Start Time)

**Your Task:** 
Return count of removed intervals.

---

## Examples

### Example 1:
**Input:** `intervals = [[1,2],[2,3],[3,4],[1,3]]`
**Output:** `1`
**Explanation:** [1,3] can be removed and the rest of the intervals are non-overlapping.

### Example 2:
**Input:** `intervals = [[1,2],[1,2],[1,2]]`
**Output:** `2`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Intervals (n) | 1 ≤ n ≤ 10^5 |
| Time Complexity | O(N log N) |
| Space Complexity | O(1) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Salesforce |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Oracle |
| 🔵 Facebook | 🟡 Apple | 🟢 IBM |

---

## Follow-up Questions

1. Why sort by end time? (Greedy choice: always pick the interval that ends earliest to leave more room for future intervals).
2. If sorted by start time? (Need to remove the one with larger end time when overlap occurs).
3. Relationship to "Activity Selection Problem"? (Same problem).
