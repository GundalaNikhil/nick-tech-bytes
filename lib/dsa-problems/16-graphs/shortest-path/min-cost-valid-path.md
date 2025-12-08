# Minimum Cost to Make at Least One Valid Path in a Grid

## Problem Description

**Real-World Scenario:**
A traffic control system modifies the direction of one-way streets (with a cost) to ensure a vehicle can reach a destination from a starting point.

**Example Setup:** 
A circuit board router changes the orientation of components to ensure a signal path exists from input to output.

**What is Minimum Cost...?**
Given an `m x n` grid. Each cell of the grid has a sign pointing to the next cell you should visit:
1. Right
2. Left
3. Lower
4. Upper
Notice that there could be some signs on the cells of the grid that point outside the grid. You will initially start at the upper left cell `(0, 0)`. A valid path in the grid is a path that starts from the upper left cell `(0, 0)` and ends at the bottom-right cell `(m - 1, n - 1)` following the signs on the grid. The valid path does not have to be the shortest. You can modify the sign on a cell with `cost = 1`. You can modify the sign on a cell one time only. Return the minimum cost to make the grid have at least one valid path.

**Why is it important?**
- 0-1 BFS (Deque) / Dijkstra
- Shortest Path on Weighted Graph (0 or 1 weights)
- Grid traversal
- Optimization

**Your Task:** 
Return minimum cost.

**Difficulty:** Medium
**Tags:** Graphs, Shortest Path, 0-1 Bfs / Dijkstra, Shortest Path On Weighted Graph, Grid Traversal, Optimization, O(m * n), Interview

---

## Examples

### Example 1:
**Input:** `grid = [[1,1,1,1],[2,2,2,2],[1,1,1,1],[2,2,2,2]]`
**Output:** `3`
**Explanation:** Change (0,3) to Down, (1,3) to Down, (2,3) to Down. Path: (0,0)->...->(0,3)->(1,3)->(2,3)->(3,3).

### Example 2:
**Input:** `grid = [[1,1,3],[3,2,2],[1,1,4]]`
**Output:** `0`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | 1 ≤ m, n ≤ 100 |
| Signs | 1, 2, 3, 4 |
| Data Type | Integer grid |
| Time Complexity | O(m * n) |
| Space Complexity | O(m * n) |
| Output Format | Integer cost |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Uber |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Lyft |
| 🔵 Facebook | 🟡 Apple | 🟢 DoorDash |

---

## Follow-up Questions

1. Why use 0-1 BFS (Deque)?
2. When do you push to front vs back of Deque?
3. How is this different from standard BFS?
4. Can you use Dijkstra (O(MN log MN))?
