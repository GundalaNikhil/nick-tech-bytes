# Max Points on a Line

## Problem Description

**Real-World Scenario:**
A surveyor wants to find the maximum number of landmarks that align perfectly straight to plan a road or a sightline.

**Example Setup:** 
Finding the most populated linear trajectory in a particle physics experiment.

**What is Max Points on a Line?**
Given an array of `points` where `points[i] = [xi, yi]` represents a point on the X-Y plane, return the maximum number of points that lie on the same straight line.

**Why is it important?**
- Geometry (Slope Calculation)
- Hash Map (Slope -> Count)
- GCD (Greatest Common Divisor) for precision
- Handling vertical lines and duplicates

**Your Task:** 
Return max points.

---

## Examples

### Example 1:
**Input:** `points = [[1,1],[2,2],[3,3]]`
**Output:** `3`

### Example 2:
**Input:** `points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]`
**Output:** `4`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Points (n) | 1 ≤ n ≤ 300 |
| Coordinates | -10^4 ≤ x, y ≤ 10^4 |
| Time Complexity | O(N^2) |
| Space Complexity | O(N) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 LinkedIn |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Twitter |
| 🔵 Facebook | 🟡 Apple | 🟢 Uber |

---

## Follow-up Questions

1. Why use GCD for slope? (Floating point precision issues).
2. How to represent slope? (String "dy/dx" or Pair (dy, dx) normalized by GCD).
3. Handling vertical lines? (dx = 0).
4. Handling duplicate points? (Add to all lines starting from that point).
