# Find Eventual Safe States

## Problem Description

**Real-World Scenario:**
A deadlock detector in a distributed system identifies processes that will eventually terminate (reach a safe state) versus those stuck in an infinite loop or cycle.

**Example Setup:** 
A game analysis tool identifies states from which a player can force a win (or at least end the game), avoiding infinite loops.

**What is Find Eventual Safe States?**
There is a directed graph of `n` nodes with each node labeled from `0` to `n - 1`. The graph is represented by a 0-indexed 2D integer array `graph` where `graph[i]` is an integer array of nodes adjacent to node `i`, meaning there is an edge from node `i` to each node in `graph[i]`.
A node is a terminal node if there are no outgoing edges. A node is a safe node if every possible path starting from that node leads to a terminal node (or another safe node).
Return an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.

**Why is it important?**
- Cycle Detection in Directed Graph
- Topological Sort (Reverse)
- DFS with 3 States (Unvisited, Visiting, Visited/Safe)
- Deadlock Detection

**Your Task:** 
Return sorted list of safe nodes.

---

## Examples

### Example 1:
**Input:** `graph = [[1,2],[2,3],[5],[0],[5],[],[]]`
**Output:** `[2,4,5,6]`
**Explanation:** 
Nodes 5 and 6 are terminal.
Node 4 -> 5 (safe).
Node 2 -> 5 (safe).
Node 0 -> 1 -> 2 -> 3 -> 0 (Cycle). 0, 1, 3 are not safe.

### Example 2:
**Input:** `graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]`
**Output:** `[4]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes (n) | 1 ≤ n ≤ 10^4 |
| Edges | Adjacency List |
| Time Complexity | O(N + E) |
| Space Complexity | O(N) |
| Output Format | Integer array |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Stripe |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Square |
| 🔵 Facebook | 🟡 Apple | 🟢 Coinbase |

---

## Follow-up Questions

1. Why use 3 colors/states in DFS? (White, Gray, Black).
2. Relationship to Topological Sort? (Kahn's algo on reverse graph).
3. Why reverse the edges for Topological Sort approach?
4. What if the graph is disconnected?
