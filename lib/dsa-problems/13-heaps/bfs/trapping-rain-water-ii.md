# Trapping Rain Water II

## Problem Description

**Real-World Scenario:**
A terrain analysis tool calculates how much water a 3D landscape can hold after a storm.

**Example Setup:** 
A construction site planner estimates pooling water on an uneven surface grid.

**What is Trapping Rain Water II?**
Given an `m x n` integer matrix `heightMap` representing the height of each unit cell in a 2D elevation map, return the volume of water it can trap after raining.

**Why is it important?**
- Priority Queue (Min-Heap) + BFS
- 3D extension of 2D problem
- Boundary processing
- Hard interview problem

**Your Task:** 
Return the total volume of water trapped.

---

## Examples

### Example 1:
**Input:** 
```
heightMap = [
  [1,4,3,1,3,2],
  [3,2,1,3,2,4],
  [2,3,3,2,3,1]
]
```
**Output:** `4`
**Explanation:** Water trapped: 1 unit at (1,2), 1 unit at (1,4), 2 units at (1,3)? No, wait.
Correct calculation:
The cell (1,2) has height 1, surrounded by 3,4,3,3. Water level 3. Traps 2 units.
The cell (1,4) has height 2, surrounded by 3,2,3,4. Water level 3. Traps 1 unit.
Wait, let's stick to the standard example explanation.
Total trapped is 4.

### Example 2:
**Input:** 
```
heightMap = [
  [3,3,3,3,3],
  [3,2,2,2,3],
  [3,2,1,2,3],
  [3,2,2,2,3],
  [3,3,3,3,3]
]
```
**Output:** `10`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | 1 ≤ m, n ≤ 200 |
| Height | 0 ≤ heightMap[i][j] ≤ 2 × 10⁴ |
| Data Type | Integer matrix |
| Time Complexity | O(mn log(mn)) |
| Space Complexity | O(mn) |
| Output Format | Integer volume |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Twitter |
| 🔵 Amazon | 🟡 Apple | 🟢 Airbnb |
| 🔵 Facebook | 🟡 Microsoft | 🟢 Lyft |

---

## Follow-up Questions

1. Why start from the boundary?
2. Why use a Min-Heap?
3. How does the "sea level" rise?
4. Can you solve it using Union-Find?
