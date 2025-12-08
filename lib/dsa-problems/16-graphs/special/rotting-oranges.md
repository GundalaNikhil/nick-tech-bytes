# Rotting Oranges

## Problem Description

**Real-World Scenario:**
In a warehouse, rotten fruit spreads to adjacent fresh fruit each minute. Given a grid of fresh/rotten/empty cells, calculate how long until all fruit is rotten (or if some remains fresh).

**Example Setup:** 
A zombie apocalypse simulation: infected people (rotten) turn adjacent healthy people (fresh) each time step. How long until everyone is infected?

**What is Rotting Oranges?**
Given a grid where 0=empty, 1=fresh, 2=rotten, each minute rotten oranges rot adjacent fresh ones. Return minimum minutes until no fresh orange remains, or -1 if impossible.

**Why is it important?**
- Multi-source BFS
- Simulation problems
- Infection/spread modeling
- Time-based grid problems

**Your Task:** 
Return minimum minutes, or -1 if some stay fresh.

---

## Examples

### Example 1:
**Input:** 
```
grid = [
  [2,1,1],
  [1,1,0],
  [0,1,1]
]
```
**Output:** `4`
**Explanation:** Rotting spreads from (0,0) outward in 4 minutes.

### Example 2:
**Input:** 
```
grid = [
  [2,1,1],
  [0,1,1],
  [1,0,1]
]
```
**Output:** `-1`
**Explanation:** Bottom-left (1) is unreachable.

### Example 3:
**Input:** `grid = [[0,2]]`
**Output:** `0`
**Explanation:** No fresh oranges.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | 1 ≤ m, n ≤ 10 |
| Cell Value | 0, 1, or 2 |
| Data Type | 2D integer array |
| Special Conditions | Multi-source BFS |
| Time Complexity | O(m × n) |
| Space Complexity | O(m × n) |
| Output Format | Minutes or -1 |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 DoorDash |
| 🔵 Microsoft | 🟡 Uber | 🟢 Instacart |
| 🔵 Google | 🟡 Apple | 🟢 Walmart |

---

## Follow-up Questions

1. Why use multi-source BFS (all rotten in queue initially)?
2. How do you track the minutes/levels?
3. What's similar to "shortest distance from guards"?
4. How would you handle obstacles?
