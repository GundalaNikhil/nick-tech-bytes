# Pacific Atlantic Water Flow

## Problem Description

**Real-World Scenario:**
An island has terrain heights forming a grid. The Pacific Ocean borders the left/top, Atlantic borders right/bottom. Rain water flows from high to low. Find cells from which water can flow to BOTH oceans.

**Example Setup:** 
A hydroelectric engineer studies water flow patterns. Given elevation data, identify all points where water can eventually reach both the east and west coasts.

**What is Pacific Atlantic Water Flow?**
Given an m×n matrix of heights, find all grid coordinates from which water can flow to both Pacific (left and top borders) and Atlantic (right and bottom borders).

**Why is it important?**
- Multi-source BFS/DFS
- River/watershed analysis
- Environmental modeling
- Two-direction reachability

**Your Task:** 
Return all cells from which water can flow to both oceans.

---

## Examples

### Example 1:
**Input:** 
```
heights = [
  [1,2,2,3,5],
  [3,2,3,4,4],
  [2,4,5,3,1],
  [6,7,1,4,5],
  [5,1,1,2,4]
]
```
**Output:** `[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]`
**Explanation:** These cells can reach both oceans.

### Example 2:
**Input:** `heights = [[1]]`
**Output:** `[[0,0]]`
**Explanation:** Single cell touches both borders.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | 1 ≤ m, n ≤ 200 |
| Height Value | 0 ≤ heights[i][j] ≤ 10⁵ |
| Data Type | 2D integer array |
| Special Conditions | Water flows to equal or lower heights |
| Time Complexity | O(m × n) |
| Space Complexity | O(m × n) |
| Output Format | List of [row, col] |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Strava |
| 🔵 Amazon | 🟡 Uber | 🟢 AllTrails |
| 🔵 Microsoft | 🟡 Apple | 🟢 Komoot |

---

## Follow-up Questions

1. Why do DFS from oceans inward (reverse flow)?
2. What's the intersection of two reachability sets?
3. How would you handle diagonal flow?
4. What if you need the shortest path to both oceans?
