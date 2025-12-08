# As Far from Land as Possible

## Problem Description

**Real-World Scenario:**
A city planner wants to build a new essential facility (like a hospital or fire station) in a water-locked area such that it is as far as possible from the nearest land (to minimize noise/pollution impact on residents, or maybe a hazardous waste facility). Wait, the problem is usually "find a water cell such that its distance to the nearest land cell is maximized".

**Example Setup:** 
Finding the spot in the ocean that is furthest from any coast (Point Nemo).

**What is As Far from Land as Possible?**
Given an `n x n` `grid` containing only values `0` (water) and `1` (land), find a water cell such that its distance to the nearest land cell is maximized, and return the distance. If no land or no water exists in the grid, return `-1`. The distance used is the Manhattan distance: `|x0 - x1| + |y0 - y1|`.

**Why is it important?**
- Multi-source BFS
- Breadth-First Search
- Grid Traversal
- Optimization

**Your Task:** 
Return max distance.

**Difficulty:** Medium
**Tags:** Graphs, Bfs, Multi-Source Bfs, Breadth-First Search, Grid Traversal, Optimization, O(N^2), Interview

---

## Examples

### Example 1:
**Input:** `grid = [[1,0,1],[0,0,0],[1,0,1]]`
**Output:** `2`
**Explanation:** The cell (1, 1) is as far as possible from all the land with distance 2.

### Example 2:
**Input:** `grid = [[1,0,0],[0,0,0],[0,0,0]]`
**Output:** `4`
**Explanation:** The cell (2, 2) is as far as possible from land with distance 4.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | 1 ≤ n ≤ 100 |
| Values | 0 or 1 |
| Data Type | Integer matrix |
| Time Complexity | O(N^2) |
| Space Complexity | O(N^2) |
| Output Format | Integer distance |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 InMobi |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Flipkart |
| 🔵 Facebook | 🟡 Apple | 🟢 Ola |

---

## Follow-up Questions

1. Why start BFS from all land cells?
2. Why is this equivalent to finding the "last visited" water cell in BFS?
3. What if Manhattan distance is replaced by Euclidean?
4. Can you do it without a queue (DP)?
