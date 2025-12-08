# Shortest Path Visiting All Nodes

## Problem Description

**Real-World Scenario:**
A robot vacuum cleaner needs to visit every room in a house layout (represented as a graph) using the minimum number of moves, starting from any room.

**Example Setup:** 
A network diagnostic tool sends a probe that must traverse every node in a server cluster to verify connectivity.

**What is Shortest Path Visiting All Nodes?**
You have an undirected, connected graph of `n` nodes labeled from `0` to `n - 1`. You are given an array `graph` where `graph[i]` is a list of all the nodes connected with node `i` by an edge. Return the length of the shortest path that visits every node. You may start and stop at any node, you may revisit nodes multiple times, and you may reuse edges.

**Why is it important?**
- BFS with Bitmask State
- State Space Search `(mask, node)`
- Shortest path in unweighted graph
- Hard graph problem

**Your Task:** 
Return minimum path length.

**Difficulty:** Medium
**Tags:** Graphs, Bfs, Bfs With Bitmask State, State Space Search ``, Shortest Path In Unweighted Graph, Hard Graph, O(N * 2^N), Interview

---

## Examples

### Example 1:
**Input:** `graph = [[1,2,3],[0],[0],[0]]`
**Output:** `4`
**Explanation:** One possible path is [1,0,2,0,3]. Length 4.

### Example 2:
**Input:** `graph = [[1],[0,2,4],[1,3,4],[2],[1,2]]`
**Output:** `4`
**Explanation:** [0,1,4,2,3].

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 12 |
| Edges | 0 ≤ graph[i].length < n |
| Data Type | Undirected Graph |
| Time Complexity | O(N * 2^N) |
| Space Complexity | O(N * 2^N) |
| Output Format | Integer length |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Zillow |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Yelp |
| 🔵 Facebook | 🟡 Apple | 🟢 Redfin |

---

## Follow-up Questions

1. Why is the state `(mask, u)`?
2. Why use BFS instead of DFS?
3. How to handle re-visiting nodes?
4. Why is N small (<= 12)?
