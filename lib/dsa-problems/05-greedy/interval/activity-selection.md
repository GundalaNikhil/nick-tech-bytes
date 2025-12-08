# Activity Selection / Non-overlapping Intervals

## Problem Description

**Real-World Scenario:**
A conference room scheduler must pick the maximum number of non-overlapping meetings from a list. Greedy selection of earliest-ending meetings works!

**Example Setup:** 
A TV broadcaster has multiple shows with time slots. Maximize the number of shows that can air without overlap.

**What is Activity Selection?**
Given intervals, find the maximum number of non-overlapping intervals you can select. This is the classic greedy activity selection problem.

**Why is it important?**
- Classic greedy problem
- Interval scheduling
- Resource allocation
- Proof of greedy correctness

**Your Task:** 
Return the maximum number of non-overlapping intervals.

---

## Examples

### Example 1:
**Input:** `intervals = [[1,2], [2,3], [3,4], [1,3]]`
**Output:** `3`
**Explanation:** Select [1,2], [2,3], [3,4] - no overlaps.

### Example 2:
**Input:** `intervals = [[1,2], [1,2], [1,2]]`
**Output:** `1`
**Explanation:** All overlap, pick only one.

### Example 3:
**Input:** `intervals = [[1,2], [2,3]]`
**Output:** `2`
**Explanation:** No overlap (touching is OK).

---

## Constraints

| Constraint | Value |
|------------|-------|
| Intervals | 1 ≤ n ≤ 10⁵ |
| Range | -5 × 10⁴ ≤ start < end ≤ 5 × 10⁴ |
| Data Type | Integer pairs |
| Special Conditions | Touching allowed |
| Time Complexity | O(n log n) for sorting |
| Space Complexity | O(1) extra |
| Output Format | Maximum count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Calendly |
| 🔵 Facebook | 🟡 Adobe | 🟢 Slack |
| 🔵 Amazon | 🟡 Uber | 🟢 Zoom |

---

## Follow-up Questions

1. Why sort by end time (not start)?
2. What's the greedy choice property proof?
3. How is this related to "erase overlap intervals"?
4. What if you need the minimum rooms instead?
