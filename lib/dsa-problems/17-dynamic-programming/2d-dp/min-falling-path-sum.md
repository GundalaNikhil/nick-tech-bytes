# Minimum Falling Path Sum

## Problem Description

**Real-World Scenario:**
A skier descends a mountain grid, moving to adjacent cells below. Find the path with minimum total difficulty rating.

**Example Setup:** 
A factory conveyor routes items through processing stations. Each station has a cost; find the cheapest route from top to bottom.

**What is Minimum Falling Path Sum?**
Find the minimum sum of a falling path through an n×n matrix. Starting from any element in the first row, move to adjacent elements in the next row (directly below or diagonally adjacent).

**Why is it important?**
- 2D DP classic
- Grid optimization
- Path finding
- Multiple start points

**Your Task:** 
Return the minimum sum of any falling path.

**Difficulty:** Medium
**Tags:** Dynamic Programming, 2D Dp, 2D Dp Classic, Grid Optimization, Path Finding, Multiple Start Points, O(n²), Interview

---

## Examples

### Example 1:
**Input:** 
```
[[2,1,3],
 [6,5,4],
 [7,8,9]]
```
**Output:** `13`
**Explanation:** Path 1→5→7 = 13 or 1→4→8 = 13.

### Example 2:
**Input:** `[[-19,57],[-40,-5]]`
**Output:** `-59`
**Explanation:** Path -19→-40 = -59.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Matrix Size | n × n where 1 ≤ n ≤ 100 |
| Element Value | -100 ≤ matrix[i][j] ≤ 100 |
| Data Type | Integer matrix |
| Special Conditions | Can start from any first row cell |
| Time Complexity | O(n²) |
| Space Complexity | O(1) if modifying input |
| Output Format | Minimum path sum |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Vail Resorts |
| 🔵 Amazon | 🟡 Goldman Sachs | 🟢 Burton |
| 🔵 Microsoft | 🟡 Apple | 🟢 Northrop Grumman |

---

## Follow-up Questions

1. What's the DP recurrence for each cell?
2. How do you handle boundary columns?
3. Can you optimize space to O(n)?
4. What about the non-adjacent version (Minimum Falling Path II)?
