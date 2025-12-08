# Shortest Bridge

## Problem Description

**Real-World Scenario:**
A civil engineer plans the shortest bridge to connect two isolated islands in an archipelago.

**Example Setup:** 
A circuit designer adds the shortest wire to connect two disjoint components on a PCB.

**What is Shortest Bridge?**
You are given an `n x n` binary matrix `grid` where `1` represents land and `0` represents water. An island is a 4-directionally connected group of `1`s not connected to any other `1`s. There are exactly two islands in `grid`. You may change `0`s to `1`s to connect the two islands to form one island. Return the smallest number of `0`s you must flip to connect the two islands.

**Why is it important?**
- DFS + BFS
- Multi-source BFS
- Component Identification
- Grid processing

**Your Task:** 
Return minimum flips.

**Difficulty:** Medium
**Tags:** Graphs, Bfs, Dfs + Bfs, Multi-Source Bfs, Component Identification, Grid Processing, O(N^2), Interview

---

## Examples

### Example 1:
**Input:** `grid = [[0,1],[1,0]]`
**Output:** `1`
**Explanation:** Flip (0,0) or (1,1)? No. Flip (0,0) connects? No.
Islands are at (0,1) and (1,0). Flip (0,0) connects them. Or (1,1).
Min flips 1.

### Example 2:
**Input:** `grid = [[0,1,0],[0,0,0],[0,0,1]]`
**Output:** `2`
**Explanation:** Flip (0,2) and (1,2)? Or (1,1) and (1,2)?
Path from (0,1) to (2,2). Distance 3. Flips 2.

### Example 3:
**Input:** `grid = [[1,1,1,1,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]`
**Output:** `1`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | 2 ≤ n ≤ 100 |
| Islands | Exactly 2 |
| Data Type | Binary Matrix |
| Time Complexity | O(N^2) |
| Space Complexity | O(N^2) |
| Output Format | Integer flips |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Uber |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Lyft |
| 🔵 Facebook | 🟡 Apple | 🟢 DoorDash |

---

## Follow-up Questions

1. Why use DFS to find the first island and add all its cells to a queue?
2. Why use BFS from the first island to find the second?
3. Why is this "Shortest Path in Unweighted Graph" (BFS)?
4. Can you modify the grid in-place to mark visited?
