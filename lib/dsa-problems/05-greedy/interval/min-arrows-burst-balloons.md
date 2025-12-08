# Minimum Number of Arrows to Burst Balloons

## Problem Description

**Real-World Scenario:**
A scheduler finds the minimum number of resources (arrows) needed to cover a set of overlapping time intervals (balloons).

**Example Setup:** 
A wireless access point placement tool finds the minimum number of APs needed to cover a set of linear service areas.

**What is Minimum Number of Arrows...?**
There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array `points` where `points[i] = [xstart, xend]` denotes a balloon whose horizontal diameter stretches between `xstart` and `xend`. You do not know the exact y-coordinates of the balloons. Arrows can be shot up directly vertically (in the positive y-direction) from different points along the x-axis. A balloon with `xstart` and `xend` is burst by an arrow shot at `x` if `xstart <= x <= xend`. There is no limit to the number of arrows that can be shot. A shot arrow keeps traveling up infinitely, bursting any balloons in its path. Given the array `points`, return the minimum number of arrows that must be shot to burst all balloons.

**Why is it important?**
- Greedy Strategy
- Interval Scheduling
- Sorting
- Optimization

**Your Task:** 
Return minimum arrows.

**Difficulty:** Medium
**Tags:** Greedy, Interval, Greedy Strategy, Interval Scheduling, Sorting, Optimization, O(N log N), Interview

---

## Examples

### Example 1:
**Input:** `points = [[10,16],[2,8],[1,6],[7,12]]`
**Output:** `2`
**Explanation:** Shoot at 6 (bursts [2,8], [1,6]). Shoot at 11 (bursts [10,16], [7,12]).

### Example 2:
**Input:** `points = [[1,2],[3,4],[5,6],[7,8]]`
**Output:** `4`

### Example 3:
**Input:** `points = [[1,2],[2,3],[3,4],[4,5]]`
**Output:** `2`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Balloons | 1 ≤ n ≤ 10⁵ |
| Coordinates | -2³¹ ≤ start < end ≤ 2³¹-1 |
| Data Type | Integer intervals |
| Time Complexity | O(N log N) |
| Space Complexity | O(1) or O(N) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Facebook |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Apple |
| 🔵 Uber | 🟡 Lyft | 🟢 Pinterest |

---

## Follow-up Questions

1. Why sort by end coordinate?
2. How is this related to "Non-overlapping Intervals"?
3. Why shoot at the end of the current balloon?
4. How to handle integer overflow during sort comparison?
