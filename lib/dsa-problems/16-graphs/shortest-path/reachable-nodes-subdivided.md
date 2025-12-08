# Reachable Nodes In Subdivided Graph

## Problem Description

**Real-World Scenario:**
A wireless signal propagates through a network of cables where each cable has a certain length (subdivisions). Determine how many total points (nodes + internal points) the signal can reach within a max distance.

**Example Setup:** 
A contagion spreads along roads between cities. Each road has `cnt` villages. Determine how many total locations (cities + villages) are infected within a certain time.

**What is Reachable Nodes...?**
You are given an undirected graph (the "original graph") with `n` nodes labeled from `0` to `n - 1`. You decide to subdivide each edge in the graph that connects node `u` and node `v` into `cnt` new nodes. The original nodes and the new nodes are all "reachable nodes". You are given the original graph `edges` where `edges[i] = [u, v, cnt]` indicates that there is an edge between nodes `u` and `v` in the original graph, and this edge is subdivided into `cnt` new nodes. You are also given an integer `maxMoves`. You start at node `0`. Return the number of reachable nodes in the subdivided graph.

**Why is it important?**
- Dijkstra's Algorithm
- Graph transformation
- Edge processing
- Hard graph problem

**Your Task:** 
Return count of reachable nodes.

**Difficulty:** Medium
**Tags:** Graphs, Shortest Path, Dijkstra'S, Graph Transformation, Edge Processing, Hard Graph, O(E log V), Interview

---

## Examples

### Example 1:
**Input:** `edges = [[0,1,10],[0,2,1],[1,2,2]], maxMoves = 6, n = 3`
**Output:** `13`
**Explanation:** 
Nodes 0, 1, 2 are reachable.
Edge 0-1 (10 nodes): Reach 6 from 0.
Edge 0-2 (1 node): Reach 1 from 0.
Edge 1-2 (2 nodes): Reach 0 from 1, 1 from 2.
Total: 3 (original) + 6 + 1 + 2 + 1 = 13.

### Example 2:
**Input:** `edges = [[0,1,4],[1,2,6],[0,2,8],[1,3,1]], maxMoves = 10, n = 4`
**Output:** `23`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 3000 |
| Edges | 0 ≤ edges.length ≤ 10000 |
| Subdivisions | 0 ≤ cnt ≤ 10000 |
| Max Moves | 0 ≤ maxMoves ≤ 10⁹ |
| Data Type | Undirected Graph |
| Time Complexity | O(E log V) |
| Space Complexity | O(V + E) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Akamai |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Cloudflare |
| 🔵 Facebook | 🟡 Apple | 🟢 Cisco |

---

## Follow-up Questions

1. Why run Dijkstra on the original graph first?
2. How to calculate reachable nodes on an edge `(u, v)`?
3. Formula: `min(cnt, reach[u] + reach[v])`?
4. Why is `maxMoves` large (10^9)?
