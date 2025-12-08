# Number of Enclaves

## Problem Description

**Real-World Scenario:**
A military strategy game identifies "enclaves" of friendly units that cannot reach the map boundary to escape/retreat.

**Example Setup:** 
A flood simulation identifies dry areas that are protected by levees and cannot be reached by water rising from the map edges.

**What is Number of Enclaves?**
You are given an `m x n` binary matrix `grid`, where `0` represents a sea cell and `1` represents a land cell. A move consists of walking from one land cell to another adjacent (4-directionally) land cell or walking off the boundary of the grid. Return the number of land cells in `grid` for which we cannot walk off the boundary of the grid in any number of moves.

**Why is it important?**
- DFS / BFS
- Flood Fill from Boundary
- Grid processing
- Inverse thinking (Count reachable from boundary, subtract from total)

**Your Task:** 
Return count of enclave cells.

---

## Examples

### Example 1:
**Input:** `grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]`
**Output:** `3`
**Explanation:** 
(1,0) is connected to boundary.
(1,2), (2,1), (2,2) are isolated. Total 3.

### Example 2:
**Input:** `grid = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]`
**Output:** `0`
**Explanation:** All 1s connected to boundary.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | 1 ≤ m, n ≤ 500 |
| Values | 0 or 1 |
| Data Type | Binary Matrix |
| Time Complexity | O(M * N) |
| Space Complexity | O(M * N) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Ubisoft |
| 🔵 Amazon | 🟡 Microsoft | 🟢 EA |
| 🔵 Facebook | 🟡 Apple | 🟢 Activision |

---

## Follow-up Questions

1. Why start DFS/BFS from all boundary `1`s?
2. Why mark reachable `1`s as visited (or change to `0`)?
3. Count remaining `1`s?
4. How is this different from "Closed Islands" (counting cells vs islands)?
