# Merge Intervals

## Problem Description

**Real-World Scenario:**
Google Calendar needs to show your "busy" times. If you have meetings 9-10, 10-11, and 2-4, it should display 9-11 and 2-4 (merged overlapping intervals).

**Example Setup:** 
A hotel booking system has room reservations as time intervals. To show availability, it needs to merge overlapping bookings and find free slots.

**What is Merge Intervals?**
Given a collection of intervals, merge all overlapping intervals and return the result.

**Why is it important?**
- Calendar applications
- Resource scheduling
- Video editing timelines
- Network packet coalescing

**Your Task:** 
Merge all overlapping intervals.

**Difficulty:** Medium
**Tags:** Sorting, Applications, Calendar Applications, Resource Scheduling, Video Editing Timelines, Network Packet Coalescing, O(n log n), Interview

---

## Examples

### Example 1:
**Input:** `intervals = [[1,3], [2,6], [8,10], [15,18]]`
**Output:** `[[1,6], [8,10], [15,18]]`
**Explanation:** [1,3] and [2,6] overlap → [1,6]

### Example 2:
**Input:** `intervals = [[1,4], [4,5]]`
**Output:** `[[1,5]]`
**Explanation:** Touching intervals are merged.

### Example 3:
**Input:** `intervals = [[1,4], [2,3]]`
**Output:** `[[1,4]]`
**Explanation:** [2,3] is completely inside [1,4].

### Example 4:
**Input:** `intervals = [[1,4], [0,0]]`
**Output:** `[[0,0], [1,4]]`
**Explanation:** No overlap, two separate intervals.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ intervals.length ≤ 10⁴ |
| Interval Range | 0 ≤ start ≤ end ≤ 10⁴ |
| Data Type | 2D integer array |
| Special Conditions | Intervals not necessarily sorted |
| Time Complexity | O(n log n) for sorting |
| Space Complexity | O(n) for output |
| Output Format | Merged interval array |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Calendly |
| 🔵 Amazon | 🟡 LinkedIn | 🟢 Booking.com |
| 🔵 Facebook | 🟡 Twitter | 🟢 Airbnb |
| 🔵 Microsoft | 🟡 Uber | 🟢 Expedia |

---

## Follow-up Questions

1. What if you need to insert a new interval (Insert Interval)?
2. How would you find meeting room requirements?
3. What if intervals are given as a stream?
4. How do you partition conflicting intervals?
