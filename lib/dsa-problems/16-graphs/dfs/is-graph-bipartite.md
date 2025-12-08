# Is Graph Bipartite?

## Problem Description

**Real-World Scenario:**
A resource allocator needs to assign tasks to two processors such that no two dependent tasks run on the same processor (if dependency implies conflict). Wait, usually bipartite means "can be divided into two independent sets".

**Example Setup:** 
Checking if a map can be colored with just 2 colors such that no adjacent regions share a color.

**What is Is Graph Bipartite?**
There is an undirected graph with `n` nodes, where each node is numbered between `0` and `n - 1`. You are given a 2D array `graph`, where `graph[u]` is an array of nodes that node `u` is adjacent to. More formally, for each `v` in `graph[u]`, there is an undirected edge between node `u` and node `v`. The graph has the following properties:
- There are no self-edges.
- There are no parallel edges.
- If `v` is in `graph[u]`, then `u` is in `graph[v]`.
- The graph may not be connected.
Return `true` if and only if it is bipartite.

**Why is it important?**
- Graph Theory Fundamental
- 2-Coloring Problem
- Odd Cycle Detection

**Your Task:** 
Return boolean.

---

## Examples

### Example 1:
**Input:** `graph = [[1,2,3],[0,2],[0,1,3],[0,2]]`
**Output:** `false`
**Explanation:** 0 is connected to 1, 2, 3. 1 connected to 2. Triangle 0-1-2. Not bipartite.

### Example 2:
**Input:** `graph = [[1,3],[0,2],[1,3],[0,2]]`
**Output:** `true`
**Explanation:** Set A: {0, 2}, Set B: {1, 3}.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes (n) | 1 ≤ n ≤ 100 |
| Edges | Adjacency List |
| Time Complexity | O(N + E) |
| Space Complexity | O(N) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Pinterest |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Snap |
| 🔵 Facebook | 🟡 Apple | 🟢 Twitter |

---

## Follow-up Questions

1. Relationship to "Possible Bipartition"? (Same core algorithm).
2. Why does an odd cycle prevent bipartition?
3. BFS vs DFS implementation?
4. Handling disconnected components?
