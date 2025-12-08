# Shortest Path in Binary Matrix

## Problem Description

**Real-World Scenario:**
A robot navigation system needs to find the shortest clear path through a grid of obstacles to reach a target destination.

**Example Setup:** 
A maze solver finding the quickest route from start to exit.

**What is Shortest Path in Binary Matrix?**
Given an `n x n` binary matrix `grid`, return the length of the shortest clear path in the matrix. If there is no clear path, return `-1`. A clear path in a binary matrix is a path from the top-left cell (0, 0) to the bottom-right cell (n - 1, n - 1) such that:
1. All the visited cells of the path are `0`.
2. All the adjacent cells of the path are 8-directionally connected (i.e., they are different and share an edge or a corner).

**Why is it important?**
- BFS (Shortest Path in Unweighted Graph)
- 8-Directional Movement
- Grid Traversal

**Your Task:** 
Return path length.

---

## Examples

### Example 1:
**Input:** `grid = [[0,1],[1,0]]`
**Output:** `2`

### Example 2:
**Input:** `grid = [[0,0,0],[1,1,0],[1,1,0]]`
**Output:** `4`

### Example 3:
**Input:** `grid = [[1,0,0],[1,1,0],[1,1,0]]`
**Output:** `-1`
**Explanation:** Start is blocked.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | 1 ≤ n ≤ 100 |
| Values | 0 or 1 |
| Data Type | Integer matrix |
| Time Complexity | O(N^2) |
| Space Complexity | O(N^2) |
| Output Format | Integer length |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Wayfair |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Yelp |
| 🔵 Facebook | 🟡 Apple | 🟢 Expedia |

---

## Follow-up Questions

1. Why 8 directions instead of 4?
2. Why BFS and not DFS?
3. How to reconstruct the path?
4. A* Search heuristic?
