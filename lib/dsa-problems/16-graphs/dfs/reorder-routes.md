# Reorder Routes to Make All Paths Lead to the City Zero

## Problem Description

**Real-World Scenario:**
A traffic management system needs to reorient one-way streets so that all traffic flows towards the city center (node 0) for a major event.

**Example Setup:** 
A drainage system where all pipes must flow towards the main treatment plant.

**What is Reorder Routes...?**
There are `n` cities numbered from `0` to `n - 1` and `n - 1` roads such that there is only one way to travel between two different cities (this implies the structure is a tree). Roads are represented by `connections` where `connections[i] = [a, b]` represents a road from city `a` to city `b`.
This year, there is a big event in the capital (city `0`), and many people want to travel to this city.
Your task consists of reorienting some roads such that each city can visit the city `0`. Return the minimum number of edges changed.

**Why is it important?**
- DFS / BFS
- Tree Traversal
- Directed vs Undirected Graph
- "Virtual" Edges

**Your Task:** 
Return count of reordered edges.

**Difficulty:** Medium
**Tags:** Graphs, Dfs, Dfs / Bfs, Tree Traversal, Directed Vs Undirected Graph, "Virtual" Edges, O(N), Interview

---

## Examples

### Example 1:
**Input:** `n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]`
**Output:** `3`
**Explanation:** Change 0->1 to 1->0. Change 1->3 to 3->1. Change 4->5 to 5->4. 2->3 is already correct (flows to 3, then 1, then 0). 4->0 is correct.

### Example 2:
**Input:** `n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]`
**Output:** `2`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Cities (n) | 2 ≤ n ≤ 5 * 10^4 |
| Connections | n - 1 (Tree structure) |
| Data Type | Adjacency List |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Booking.com |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Expedia |
| 🔵 Facebook | 🟡 Apple | 🟢 TripAdvisor |

---

## Follow-up Questions

1. Why treat the graph as undirected to traverse?
2. How to distinguish original direction vs artificial direction?
3. Why start DFS from 0?
4. If edge is `u -> v` and we go `u -> v` (away from 0), why count it?
