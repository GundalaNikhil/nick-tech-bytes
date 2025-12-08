# Number of Closed Islands

## Problem Description

**Real-World Scenario:**
A terrain analyzer identifies "lakes" completely surrounded by land (cannot flow off the edge of the map).

**Example Setup:** 
A Go game analyzer counts the number of captured territories (empty points completely surrounded by opponent stones).

**What is Number of Closed Islands?**
Given a 2D `grid` consists of `0`s (land) and `1`s (water). An island is a maximal 4-directionally connected group of `0`s and a closed island is an island totally (all left, top, right, bottom) surrounded by `1`s. Return the number of closed islands.

**Why is it important?**
- DFS / BFS
- Flood Fill
- Boundary Check
- Grid processing

**Your Task:** 
Return count of closed islands.

**Difficulty:** Medium
**Tags:** Graphs, Dfs, Dfs / Bfs, Flood Fill, Boundary Check, Grid Processing, O(M * N), Interview

---

## Examples

### Example 1:
**Input:** `grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]`
**Output:** `2`
**Explanation:** 
Islands at edge are not closed.
Two internal islands.

### Example 2:
**Input:** `grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]`
**Output:** `1`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | 1 ≤ m, n ≤ 100 |
| Values | 0 or 1 |
| Data Type | Integer matrix |
| Time Complexity | O(M * N) |
| Space Complexity | O(M * N) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Zillow |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Redfin |
| 🔵 Facebook | 🟡 Apple | 🟢 Trulia |

---

## Follow-up Questions

1. Why flood fill islands connected to the boundary first (mark them as non-closed)?
2. Why count remaining islands?
3. Is `0` land or water? (Problem says 0 is land, 1 is water. Wait. "0s (land) and 1s (water)". Usually 1 is land. Read carefully: "0s (land)". Okay).
4. Can you use Union-Find?
