# Walls and Gates

## Problem Description

**Real-World Scenario:**
A mall navigation system calculates distance from any point to the nearest exit. Fill in the distance for each empty room.

**Example Setup:** 
A fire evacuation planner marks each room with the distance to the nearest fire exit.

**What is Walls and Gates?**
Given a grid with rooms (INF), walls (-1), and gates (0), fill each room with distance to its nearest gate using BFS.

**Why is it important?**
- Multi-source BFS
- Distance propagation
- Evacuation planning
- In-place modification

**Your Task:** 
Fill each room with distance to nearest gate.

**Difficulty:** Medium
**Tags:** Graphs, Bfs, Multi-Source Bfs, Distance Propagation, Evacuation Planning, In-Place Modification, O(m × n), Interview

---

## Examples

### Example 1:
**Input:** 
```
[[INF, -1,  0, INF],
 [INF, INF, INF, -1],
 [INF, -1, INF, -1],
 [ 0, -1, INF, INF]]
```
**Output:** 
```
[[3, -1, 0, 1],
 [2, 2, 1, -1],
 [1, -1, 2, -1],
 [0, -1, 3, 4]]
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | m × n where 1 ≤ m, n ≤ 250 |
| Cell Value | -1, 0, or INF |
| Data Type | Integer matrix |
| Special Conditions | INF = 2147483647 |
| Time Complexity | O(m × n) |
| Space Complexity | O(m × n) for queue |
| Output Format | Modified grid |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Simon Property |
| 🔵 Amazon | 🟡 Uber | 🟢 Westfield |
| 🔵 Google | 🟡 Apple | 🟢 CBRE |

---

## Follow-up Questions

1. Why start BFS from gates (not rooms)?
2. How does multi-source BFS ensure shortest path?
3. Why is this O(mn) and not O(mn × gates)?
4. What about weighted distances?
