# Minimum Path Sum

## Problem Description

**Real-World Scenario:**
A delivery robot navigates a warehouse grid. Each cell has a "cost" (time or energy). Find the cheapest path from top-left to bottom-right corner.

**Example Setup:** 
A hiking app shows trail difficulty on a grid map. Find the easiest path from the start to the destination, moving only right or down.

**What is Minimum Path Sum?**
Given a m×n grid filled with non-negative numbers, find a path from top-left to bottom-right that minimizes the sum of all numbers along the path. You can only move right or down.

**Why is it important?**
- Classic 2D DP
- Grid traversal
- Path optimization
- Delivery/routing applications

**Your Task:** 
Return the minimum path sum.

---

## Examples

### Example 1:
**Input:** 
```
grid = [
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
```
**Output:** `7`
**Explanation:** Path 1→3→1→1→1 = 7.

### Example 2:
**Input:** 
```
grid = [
  [1,2,3],
  [4,5,6]
]
```
**Output:** `12`
**Explanation:** Path 1→2→3→6 = 12.

### Example 3:
**Input:** `grid = [[1]]`
**Output:** `1`
**Explanation:** Single cell.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | 1 ≤ m, n ≤ 200 |
| Cell Value | 0 ≤ grid[i][j] ≤ 200 |
| Data Type | 2D integer array |
| Special Conditions | Can only move right or down |
| Time Complexity | O(m × n) |
| Space Complexity | O(1) if modifying grid, O(n) otherwise |
| Output Format | Minimum sum integer |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Doordash |
| 🔵 Google | 🟡 Goldman Sachs | 🟢 Instacart |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Uber Eats |

---

## Follow-up Questions

1. What's the DP recurrence?
2. Can you optimize to O(n) space?
3. How would you return the actual path?
4. What if you can move in all 4 directions (Dijkstra)?
