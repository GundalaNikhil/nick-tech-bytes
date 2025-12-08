# Longest Increasing Path in a Matrix

## Problem Description

**Real-World Scenario:**
A skier finds the longest downhill path on a terrain map. Can only move to adjacent cells with lower elevation.

**Example Setup:** 
A water drainage system finds the longest flow path from any point to any drain (always flowing downhill).

**What is Longest Increasing Path?**
Given an m×n integer matrix, find the length of the longest increasing path. Move from a cell to adjacent cells with strictly greater values.

**Why is it important?**
- DFS with memoization
- Matrix traversal
- Topological sort on grid
- Classic interview problem

**Your Task:** 
Return the length of the longest increasing path.

**Difficulty:** Medium
**Tags:** Dynamic Programming, Grid Dp, Dfs With Memoization, Matrix Traversal, Topological Sort On Grid, Classic Interview, O(m × n), Interview

---

## Examples

### Example 1:
**Input:** 
```
[[9,9,4],
 [6,6,8],
 [2,1,1]]
```
**Output:** `4`
**Explanation:** Path: 1→2→6→9.

### Example 2:
**Input:** 
```
[[3,4,5],
 [3,2,6],
 [2,2,1]]
```
**Output:** `4`
**Explanation:** Path: 3→4→5→6.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Matrix Size | 1 ≤ m, n ≤ 200 |
| Element Value | 0 ≤ matrix[i][j] ≤ 2³¹-1 |
| Data Type | Integer matrix |
| Special Conditions | Strictly increasing |
| Time Complexity | O(m × n) |
| Space Complexity | O(m × n) |
| Output Format | Length of longest path |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Vail Resorts |
| 🔵 Amazon | 🟡 Apple | 🟢 Burton |
| 🔵 Facebook | 🟡 Microsoft | 🟢 Rossignol |

---

## Follow-up Questions

1. Why memoization avoids revisiting?
2. How does the "increasing" constraint prevent cycles?
3. Can you use topological sort approach?
4. What about longest decreasing path?
