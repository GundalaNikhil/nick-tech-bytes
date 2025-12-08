# Unique Paths II (With Obstacles)

## Problem Description

**Real-World Scenario:**
A delivery drone navigates a warehouse grid with blocked cells (obstacles). Count possible routes from start to destination avoiding obstacles.

**Example Setup:** 
A city navigation app finds the number of valid walking routes between two points, considering closed streets.

**What is Unique Paths II?**
Like Unique Paths, but some cells have obstacles. Find the number of unique paths from top-left to bottom-right.

**Why is it important?**
- DP with constraints
- Path planning with blocks
- Real-world navigation
- Obstacle handling

**Your Task:** 
Return the number of unique paths avoiding obstacles.

**Difficulty:** Medium
**Tags:** Dynamic Programming, 2D Dp, Dp With Constraints, Path Planning With Blocks, Real-World Navigation, Obstacle Handling, O(m × n), Interview

---

## Examples

### Example 1:
**Input:** 
```
obstacleGrid = [
  [0,0,0],
  [0,1,0],
  [0,0,0]
]
```
**Output:** `2`
**Explanation:** Two paths avoid the obstacle.

### Example 2:
**Input:** `obstacleGrid = [[0,1],[0,0]]`
**Output:** `1`
**Explanation:** Only one valid path.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Dimensions | 1 ≤ m, n ≤ 100 |
| Cell Value | 0 (empty) or 1 (obstacle) |
| Data Type | 2D integer array |
| Special Conditions | Start/end could be blocked |
| Time Complexity | O(m × n) |
| Space Complexity | O(n) optimized |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Waymo |
| 🔵 Google | 🟡 Uber | 🟢 Cruise |
| 🔵 Microsoft | 🟡 Apple | 🟢 Nuro |

---

## Follow-up Questions

1. How do you handle obstacles in DP?
2. What if start or end is an obstacle?
3. Can obstacles create disconnected regions?
4. What about minimum cost path with obstacles?
