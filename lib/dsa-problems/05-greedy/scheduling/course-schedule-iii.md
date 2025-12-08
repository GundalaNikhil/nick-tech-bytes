# Course Schedule III

## Problem Description

**Real-World Scenario:**
A student wants to take the maximum number of courses, where each course has a duration and a strict deadline (last day to complete).

**Example Setup:** 
A task scheduler prioritizes tasks with deadlines to complete the maximum number of tasks on a single machine.

**What is Course Schedule III?**
There are `n` different online courses numbered from `1` to `n`. You are given an array `courses` where `courses[i] = [duration, lastDay]` indicate that the `ith` course should be taken continuously for `duration` days and must be finished before or on `lastDay`. You will start on the 1st day. Return the maximum number of courses that you can take.

**Why is it important?**
- Greedy Strategy
- Max-Heap (Priority Queue)
- Scheduling optimization
- Interview classic

**Your Task:** 
Return max courses.

**Difficulty:** Medium
**Tags:** Greedy, Scheduling, Greedy Strategy, Max-Heap, Scheduling Optimization, Interview Classic, O(N log N), Interview

---

## Examples

### Example 1:
**Input:** `courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]`
**Output:** `3`
**Explanation:** 
Take course 1 (100, 200). Time 100.
Take course 3 (1000, 1250). Time 1100.
Take course 2 (200, 1300). Time 1300.
Course 4 cannot be taken.

### Example 2:
**Input:** `courses = [[1,2]]`
**Output:** `1`

### Example 3:
**Input:** `courses = [[3,2],[4,3]]`
**Output:** `0`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Courses | 1 ≤ n ≤ 10⁴ |
| Duration | 1 ≤ duration ≤ lastDay ≤ 10⁴ |
| Data Type | Integer array |
| Time Complexity | O(N log N) |
| Space Complexity | O(N) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Coursera |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Udacity |
| 🔵 Facebook | 🟡 Apple | 🟢 edX |

---

## Follow-up Questions

1. Why sort courses by `lastDay` (deadline)?
2. Why use a Max-Heap to store durations of taken courses?
3. If current course doesn't fit, why swap with the longest taken course (if current is shorter)?
4. Why is this greedy choice optimal?
