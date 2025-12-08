# 01 Matrix

## Problem Description

**Real-World Scenario:**
A delivery app calculates distance from each location to the nearest warehouse (marked as 0).

**Example Setup:** 
A hospital network measures each room's distance to the nearest emergency station.

**What is 01 Matrix?**
Given a binary matrix, find the distance of each cell to the nearest 0. Distance is calculated using Manhattan distance (up/down/left/right).

**Why is it important?**
- Multi-source BFS
- Distance matrix
- Nearest facility problems
- Hospital/evacuation planning

**Your Task:** 
Return the distance matrix.

**Difficulty:** Medium
**Tags:** Graphs, Bfs, Multi-Source Bfs, Distance Matrix, Nearest Facility Problems, Hospital/Evacuation Planning, O(m × n), Interview

---

## Examples

### Example 1:
**Input:** 
```
[[0,0,0],
 [0,1,0],
 [0,0,0]]
```
**Output:** 
```
[[0,0,0],
 [0,1,0],
 [0,0,0]]
```

### Example 2:
**Input:** 
```
[[0,0,0],
 [0,1,0],
 [1,1,1]]
```
**Output:** 
```
[[0,0,0],
 [0,1,0],
 [1,2,1]]
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| Matrix Size | m × n where 1 ≤ m, n ≤ 10⁴ |
| Elements | m × n ≤ 10⁴ |
| Cell Value | 0 or 1 |
| Data Type | Binary matrix |
| Time Complexity | O(m × n) |
| Space Complexity | O(m × n) |
| Output Format | Distance matrix |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 DoorDash |
| 🔵 Google | 🟡 Uber | 🟢 Instacart |
| 🔵 Microsoft | 🟡 Apple | 🟢 Gopuff |

---

## Follow-up Questions

1. Why BFS from 0s instead of from 1s?
2. How does this differ from Walls and Gates?
3. Can you use DP instead of BFS?
4. What about weighted distances?
