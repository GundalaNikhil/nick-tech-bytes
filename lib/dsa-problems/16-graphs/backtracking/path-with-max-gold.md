# Path with Maximum Gold

## Problem Description

**Real-World Scenario:**
A miner navigates a grid of gold mines to collect the maximum amount of gold, but cannot visit a cell with 0 gold and cannot revisit cells.

**Example Setup:** 
A pacman-like game agent collects points in a maze without retracing steps.

**What is Path with Maximum Gold?**
In a gold mine grid of size `m x n`, each cell in this mine has an integer representing the amount of gold in that cell, `0` if it is empty. Return the maximum amount of gold you can collect under the conditions:
- Every time you are located in a cell you will collect all the gold in that cell.
- From your position, you can walk one step to the left, right, up, or down.
- You can't visit the same cell more than once.
- Never visit a cell with `0` gold.
- You can start and stop collecting gold from any position in the grid that has some gold.

**Why is it important?**
- Backtracking / DFS
- Grid traversal
- Path finding
- Optimization

**Your Task:** 
Return max gold.

---

## Examples

### Example 1:
**Input:** `grid = [[0,6,0],[5,8,7],[0,9,0]]`
**Output:** `24`
**Explanation:** Path 9 -> 8 -> 7. Total 24.

### Example 2:
**Input:** `grid = [[1,0,7],[2,0,6],[3,4,5],[0,3,0],[9,0,20]]`
**Output:** `28`
**Explanation:** 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7. Total 28.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | 1 ≤ m, n ≤ 15 |
| Gold | 0 ≤ val ≤ 100 |
| Cells with Gold | At most 25 |
| Data Type | Integer grid |
| Time Complexity | O(k * 3^k) where k is gold cells |
| Space Complexity | O(k) |
| Output Format | Integer gold |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Roblox |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Unity |
| 🔵 Facebook | 🟡 Apple | 🟢 Epic Games |

---

## Follow-up Questions

1. Why is this Backtracking (DFS with state reset)?
2. Why mark visited cells as 0 (and restore later)?
3. Why iterate over all cells as potential starting points?
4. Why is the complexity exponential (3^k)?
