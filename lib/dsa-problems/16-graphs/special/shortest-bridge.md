# Shortest Bridge

## Problem Description

**Real-World Scenario:**
Civil engineers build a bridge between two islands. Find the minimum bridge length needed to connect them.

**Example Setup:** 
A network planner connects two isolated server clusters with minimum cable length.

**What is Shortest Bridge?**
Given a binary matrix with exactly two islands (groups of 1s), find the minimum number of 0s to flip to connect the islands.

**Why is it important?**
- Multi-source BFS
- DFS + BFS combination
- Island problems
- Graph expansion

**Your Task:** 
Return the minimum bridge length (0s to flip).

---

## Examples

### Example 1:
**Input:** 
```
[[0,1],
 [1,0]]
```
**Output:** `1`
**Explanation:** Flip one 0 to connect diagonals.

### Example 2:
**Input:** 
```
[[0,1,0],
 [0,0,0],
 [0,0,1]]
```
**Output:** `2`
**Explanation:** Flip two 0s to connect.

### Example 3:
**Input:** 
```
[[1,1,1,1,1],
 [1,0,0,0,1],
 [1,0,1,0,1],
 [1,0,0,0,1],
 [1,1,1,1,1]]
```
**Output:** `1`
**Explanation:** Inner island separated by 1 cell.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | 2 ≤ n ≤ 100 |
| Islands | Exactly 2 |
| Data Type | Binary matrix |
| Special Conditions | 4-directional connectivity |
| Time Complexity | O(n²) |
| Space Complexity | O(n²) |
| Output Format | Minimum bridge length |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 ABB |
| 🔵 Google | 🟡 Microsoft | 🟢 Bechtel |
| 🔵 Facebook | 🟡 Apple | 🟢 Fluor |

---

## Follow-up Questions

1. How do you mark the first island (DFS)?
2. Why use multi-source BFS from island boundary?
3. How do you track visited cells?
4. What if there were more than 2 islands?
