# Insert Interval

## Problem Description

**Real-World Scenario:**
A calendar app inserts a new meeting into an already-sorted schedule. If the new meeting overlaps with existing ones, they must be merged into a single time block.

**Example Setup:** 
A delivery route planner has fixed delivery windows. When a new delivery is added, overlapping windows must merge to avoid confusion.

**What is Insert Interval?**
Given a sorted list of non-overlapping intervals, insert a new interval and merge if necessary to maintain the sorted, non-overlapping property.

**Why is it important?**
- Interval manipulation
- Merge logic
- Calendar applications
- Sorted insert + merge

**Your Task:** 
Insert the new interval and merge overlaps.

**Difficulty:** Medium
**Tags:** Sorting, Applications, Interval Manipulation, Merge Logic, Calendar Applications, Sorted Insert + Merge, O(n), Interview

---

## Examples

### Example 1:
**Input:** `intervals = [[1,3], [6,9]], newInterval = [2,5]`
**Output:** `[[1,5], [6,9]]`
**Explanation:** [2,5] overlaps with [1,3], merge to [1,5].

### Example 2:
**Input:** `intervals = [[1,2], [3,5], [6,7], [8,10], [12,16]], newInterval = [4,8]`
**Output:** `[[1,2], [3,10], [12,16]]`
**Explanation:** [4,8] overlaps with [3,5], [6,7], [8,10].

### Example 3:
**Input:** `intervals = [], newInterval = [5,7]`
**Output:** `[[5,7]]`
**Explanation:** Empty list, just add.

### Example 4:
**Input:** `intervals = [[1,5]], newInterval = [2,3]`
**Output:** `[[1,5]]`
**Explanation:** New interval is completely inside.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Intervals | 0 ≤ n ≤ 10⁴ |
| Range | 0 ≤ start ≤ end ≤ 10⁵ |
| Data Type | Integer pairs |
| Special Conditions | Input intervals already sorted |
| Time Complexity | O(n) |
| Space Complexity | O(n) for output |
| Output Format | Merged interval array |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 LinkedIn | 🟢 Calendly |
| 🔵 Facebook | 🟡 Uber | 🟢 Expedia |
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Booking.com |

---

## Follow-up Questions

1. What are the three phases: before, overlapping, after?
2. How do you detect overlap?
3. Can you do this in-place?
4. What if intervals aren't sorted?
