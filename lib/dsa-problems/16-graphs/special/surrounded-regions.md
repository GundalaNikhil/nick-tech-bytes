# Surrounded Regions

## Problem Description

**Real-World Scenario:**
In the board game Go, stones that are completely surrounded by opponent stones are captured. Find all 'O' regions that are completely surrounded by 'X' and capture them.

**Example Setup:** 
A flood simulation marks land areas. Regions of 'O' (water) that are completely surrounded by 'X' (land) are considered enclosed lakes and should be filled.

**What is Surrounded Regions?**
Given an m×n board with 'X' and 'O', capture all regions of 'O' that are completely surrounded by 'X' (not connected to any border).

**Why is it important?**
- BFS/DFS on grid
- Border-connected components
- Game logic (Go, chess)
- Flood fill variant

**Your Task:** 
Capture all surrounded 'O' regions by replacing them with 'X'.

**Difficulty:** Medium
**Tags:** Graphs, Special, Bfs/Dfs On Grid, Border-Connected Components, Game Logic, Flood Fill Variant, O(m × n), Interview

---

## Examples

### Example 1:
**Input:** 
```
board = [
  ["X","X","X","X"],
  ["X","O","O","X"],
  ["X","X","O","X"],
  ["X","O","X","X"]
]
```
**Output:** 
```
[
  ["X","X","X","X"],
  ["X","X","X","X"],
  ["X","X","X","X"],
  ["X","O","X","X"]
]
```
**Explanation:** Bottom-left 'O' connects to border, not captured.

### Example 2:
**Input:** `board = [["X"]]`
**Output:** `[["X"]]`
**Explanation:** No 'O' to capture.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | 1 ≤ m, n ≤ 200 |
| Cell Value | 'X' or 'O' |
| Data Type | 2D character array |
| Special Conditions | Border-connected O's are safe |
| Time Complexity | O(m × n) |
| Space Complexity | O(m × n) worst case |
| Output Format | Modified board |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Activision |
| 🔵 Amazon | 🟡 Uber | 🟢 Zynga |
| 🔵 Apple | 🟡 Snapchat | 🟢 King |

---

## Follow-up Questions

1. Why start DFS/BFS from borders?
2. What's the marking approach (O → safe → O)?
3. How is this different from Number of Islands?
4. Can you solve using Union-Find?
