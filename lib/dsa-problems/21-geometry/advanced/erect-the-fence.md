# Erect the Fence (Convex Hull)

## Problem Description

**Real-World Scenario:**
A farmer wants to build a fence around all their trees using the minimum amount of fencing material. The fence must enclose all trees.

**Example Setup:** 
Finding the outer boundary of a set of data points for collision detection in a game.

**What is Erect the Fence?**
You are given an array `trees` where `trees[i] = [xi, yi]` represents the location of a tree in the garden. You are asked to fence the entire garden using the minimum length of rope as it is expensive. The garden is well fenced only if all the trees are enclosed.
Return the coordinates of trees that are exactly located on the fence perimeter.

**Why is it important?**
- Computational Geometry
- Convex Hull Algorithms (Monotone Chain, Jarvis March, Graham Scan)
- Cross Product (Orientation)

**Your Task:** 
Return list of boundary points.

---

## Examples

### Example 1:
**Input:** `points = [[1,1],[2,2],[2,0],[2,4],[3,3],[4,2]]`
**Output:** `[[1,1],[2,0],[4,2],[3,3],[2,4]]`

### Example 2:
**Input:** `points = [[1,2],[2,2],[4,2]]`
**Output:** `[[1,2],[2,2],[4,2]]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Points (n) | 1 ≤ n ≤ 3000 |
| Coordinates | 0 ≤ x, y ≤ 100 |
| Time Complexity | O(N log N) or O(N*H) |
| Space Complexity | O(N) |
| Output Format | List of Lists |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 DJI |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Niantic |
| 🔵 Facebook | 🟡 Apple | 🟢 Unity |

---

## Follow-up Questions

1. What is the Cross Product? (Determines if a turn is left, right, or straight).
2. Monotone Chain vs Jarvis March? (Monotone Chain O(N log N) is usually preferred. Jarvis March O(NH) is good if H is small).
3. Handling collinear points? (Include them if they are on the boundary).
