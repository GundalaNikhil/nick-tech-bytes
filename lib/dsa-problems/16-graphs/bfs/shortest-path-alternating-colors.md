# Shortest Path with Alternating Colors

## Problem Description

**Real-World Scenario:**
A logistics network has two types of transport links (Red=Train, Blue=Flight). Find the shortest path between cities such that the mode of transport alternates at every step.

**Example Setup:** 
A chemical reaction pathway requires alternating between heating (Red) and cooling (Blue) steps to reach a target state.

**What is Shortest Path with Alternating Colors?**
You are given an integer `n`, the number of nodes in a directed graph where the nodes are labeled from `0` to `n - 1`. Each edge is red or blue in this graph, and there could be self-edges and parallel edges. You are given two arrays `redEdges` and `blueEdges` where `redEdges[i] = [ai, bi]` indicates that there is a directed red edge from node `ai` to node `bi` in the graph, and `blueEdges[j] = [uj, vj]` indicates that there is a directed blue edge from node `uj` to node `vj` in the graph. Return an array `answer` of length `n`, where each `answer[x]` is the length of the shortest path from node `0` to node `x` such that the edge colors alternate along the path, or `-1` if such a path does not exist.

**Why is it important?**
- BFS with State `(node, last_color)`
- Multi-layer Graph
- Shortest Path
- Interview classic

**Your Task:** 
Return array of shortest paths.

**Difficulty:** Medium
**Tags:** Graphs, Bfs, Bfs With State ``, Multi-Layer Graph, Shortest Path, Interview Classic, O(V + E), Interview

---

## Examples

### Example 1:
**Input:** `n = 3, redEdges = [[0,1],[1,2]], blueEdges = []`
**Output:** `[0,1,-1]`
**Explanation:** 
0->0: 0.
0->1 (Red): 1.
0->2: Needs Blue after Red. None. -1.

### Example 2:
**Input:** `n = 3, redEdges = [[0,1]], blueEdges = [[2,1]]`
**Output:** `[0,1,-1]`

### Example 3:
**Input:** `n = 3, redEdges = [[1,0]], blueEdges = [[2,1]]`
**Output:** `[0,-1,-1]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 100 |
| Edges | 0 ≤ len ≤ 400 |
| Data Type | Directed Graph |
| Time Complexity | O(V + E) |
| Space Complexity | O(V + E) |
| Output Format | Integer array |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Expedia |
| 🔵 Amazon | 🟡 Microsoft | 🟢 TripAdvisor |
| 🔵 Facebook | 🟡 Apple | 🟢 Booking |

---

## Follow-up Questions

1. Why is the state `(node, color)`?
2. Why initialize `dist[node][color]` to infinity?
3. Why can we visit a node twice (once arriving via Red, once via Blue)?
4. How to handle parallel edges?
