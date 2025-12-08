# Car Fleet

## Problem Description

**Real-World Scenario:**
On a single-lane highway, cars converge into fleets based on speed and starting position. A faster car behind a slower one must slow down when they meet.

**Example Setup:** 
A race tracking system counts groups of cars that arrive at the finish line together.

**What is Car Fleet?**
Given n cars at different positions going to a target, cars can catch up but not pass. Count how many fleets reach the destination.

**Why is it important?**
- Stack-based simulation
- Time calculation
- Physics meets CS
- Common interview problem

**Your Task:** 
Return the number of car fleets that will arrive.

---

## Examples

### Example 1:
**Input:** `target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]`
**Output:** `3`
**Explanation:** Cars at 10,8 form 1 fleet, car at 0 alone, cars at 5,3 form 1 fleet.

### Example 2:
**Input:** `target = 10, position = [3], speed = [3]`
**Output:** `1`
**Explanation:** Single car.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Cars | 0 ≤ n ≤ 10⁵ |
| Position | 0 ≤ position[i] < target |
| Speed | 0 < speed[i] ≤ 10⁶ |
| Target | 0 < target ≤ 10⁶ |
| Time Complexity | O(n log n) |
| Space Complexity | O(n) |
| Output Format | Fleet count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Waymo |
| 🔵 Amazon | 🟡 Uber | 🟢 Cruise |
| 🔵 Microsoft | 🟡 Lyft | 🟢 Zoox |

---

## Follow-up Questions

1. Why sort by position descending?
2. How does time to reach target determine merging?
3. Why use a stack?
4. What about Car Fleet II (collision times)?
