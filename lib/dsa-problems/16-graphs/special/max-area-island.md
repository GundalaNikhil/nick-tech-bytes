# Max Area of Island

## Problem Description

**Real-World Scenario:**
A satellite imaging company analyzes terrain maps. Given a grid of land (1) and water (0), find the largest contiguous land mass (island).

**Example Setup:** 
A real estate developer evaluates coastal properties. Find the largest connected land area for potential development.

**What is Max Area of Island?**
Given a binary grid, find the area (cell count) of the largest island. Cells are connected horizontally/vertically.

**Why is it important?**
- DFS on grid
- Flood fill
- Connected components
- Geographic analysis

**Your Task:** 
Return the maximum area of an island.

**Difficulty:** Medium
**Tags:** Graphs, Special, Dfs On Grid, Flood Fill, Connected Components, Geographic Analysis, O(m × n), Interview

---

## Examples

### Example 1:
**Input:** 
```
grid = [
  [0,0,1,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,1,1,0,1,0,0,0,0,0,0,0,0],
  [0,1,0,0,1,1,0,0,1,0,1,0,0],
  [0,1,0,0,1,1,0,0,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0]
]
```
**Output:** `6`
**Explanation:** Largest island has 6 cells.

### Example 2:
**Input:** `grid = [[0,0,0,0]]`
**Output:** `0`
**Explanation:** No island.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | 1 ≤ m, n ≤ 50 |
| Cell Value | 0 or 1 |
| Data Type | 2D integer array |
| Special Conditions | Only horizontal/vertical connection |
| Time Complexity | O(m × n) |
| Space Complexity | O(m × n) for recursion |
| Output Format | Maximum area |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Zillow |
| 🔵 Facebook | 🟡 Uber | 🟢 Redfin |
| 🔵 Google | 🟡 Apple | 🟢 Trulia |

---

## Follow-up Questions

1. How do you track area during DFS?
2. Should you mark visited or restore grid?
3. What if diagonal connections count?
4. How about finding the island's perimeter?
