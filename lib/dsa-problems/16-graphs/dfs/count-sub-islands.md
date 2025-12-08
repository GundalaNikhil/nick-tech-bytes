# Count Number of Sub-Islands

## Problem Description

**Real-World Scenario:**
A satellite image analyzer identifies "sub-islands" where a landmass in a new image is completely contained within a landmass in an older reference image (e.g., tracking deforestation or erosion).

**Example Setup:** 
A memory leak detector finds allocated blocks (islands) in a heap snapshot that are completely contained within a specific memory region (reference grid).

**What is Count Number of Sub-Islands?**
You are given two `m x n` binary matrices `grid1` and `grid2` containing only `0`s (water) and `1`s (land). An island is a group of `1`s connected 4-directionally (horizontal or vertical). Any cells outside of the grid are considered water cells. An island in `grid2` is considered a sub-island if there is an island in `grid1` that contains all the cells that make up this island in `grid2`. Return the number of islands in `grid2` that are considered sub-islands.

**Why is it important?**
- DFS / BFS
- Flood Fill
- Component Verification
- Grid processing

**Your Task:** 
Return count of sub-islands.

**Difficulty:** Medium
**Tags:** Graphs, Dfs, Dfs / Bfs, Flood Fill, Component Verification, Grid Processing, O(M * N), Interview

---

## Examples

### Example 1:
**Input:** `grid1 = [[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]], grid2 = [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]`
**Output:** `3`

### Example 2:
**Input:** `grid1 = [[1,0,1,0,1],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1],[1,0,1,0,1]], grid2 = [[0,0,0,0,0],[1,1,1,1,1],[0,1,0,1,0],[0,1,0,1,0],[1,0,0,0,1]]`
**Output:** `2`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | 1 ≤ m, n ≤ 500 |
| Values | 0 or 1 |
| Data Type | Binary Matrix |
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

1. Why traverse islands in `grid2`?
2. If `grid2[i][j] == 1` but `grid1[i][j] == 0`, is the whole island invalid?
3. Why continue traversing even if one cell fails (to mark the whole island visited)?
4. Can you modify `grid2` in-place to save space?
