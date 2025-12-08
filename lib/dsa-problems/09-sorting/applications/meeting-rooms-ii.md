# Meeting Rooms II (Minimum Rooms)

## Problem Description

**Real-World Scenario:**
A conference center needs to know how many rooms to keep open today. Given all meeting times, find the minimum number of rooms needed so no meetings overlap in the same room.

**Example Setup:** 
An office manager sees today's calendar: team meetings, 1-on-1s, all-hands. How many conference rooms must be booked to accommodate all meetings without conflicts?

**What is Meeting Rooms II?**
Given an array of meeting time intervals, find the minimum number of conference rooms required.

**Why is it important?**
- Resource allocation
- Interval scheduling
- Min-heap for tracking end times
- Real-world calendar applications

**Your Task:** 
Return the minimum number of rooms needed.

---

## Examples

### Example 1:
**Input:** `intervals = [[0,30], [5,10], [15,20]]`
**Output:** `2`
**Explanation:** [0,30] overlaps with both others. Need 2 rooms.

### Example 2:
**Input:** `intervals = [[7,10], [2,4]]`
**Output:** `1`
**Explanation:** Meetings don't overlap. One room suffices.

### Example 3:
**Input:** `intervals = [[0,1], [1,2], [2,3]]`
**Output:** `1`
**Explanation:** Sequential meetings, one room.

### Example 4:
**Input:** `intervals = [[1,5], [2,6], [3,7], [4,8]]`
**Output:** `4`
**Explanation:** All overlap at time 4. Need 4 rooms.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Intervals | 1 ≤ intervals.length ≤ 10⁴ |
| Time Range | 0 ≤ start < end ≤ 10⁶ |
| Data Type | Integer pairs |
| Special Conditions | Meetings can touch (end = start OK) |
| Time Complexity | O(n log n) |
| Space Complexity | O(n) for heap/sorting |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Calendly |
| 🔵 Facebook | 🟡 Uber | 🟢 Slack |
| 🔵 Amazon | 🟡 LinkedIn | 🟢 Zoom |

---

## Follow-up Questions

1. How does the min-heap approach work?
2. How does the two-pointer (sweep line) approach work?
3. What's the relationship to interval graph coloring?
4. How would you find WHICH meetings go in which room?
