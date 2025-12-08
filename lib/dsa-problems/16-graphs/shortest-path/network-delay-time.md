# Network Delay Time

## Problem Description

**Real-World Scenario:**
A network admin sends a signal to all servers and measures how long until all receive it. Find the minimum time for a broadcast message to reach all nodes.

**Example Setup:** 
A news agency measures how fast a breaking news alert reaches all subscribers through a relay network.

**What is Network Delay Time?**
Given a network of n nodes and signal travel times, find how long it takes for a signal from source k to reach all nodes. Return -1 if impossible.

**Why is it important?**
- Dijkstra's algorithm
- Shortest path from single source
- Network analysis
- Maximum of minimums

**Your Task:** 
Return the minimum time for all nodes to receive the signal.

**Difficulty:** Medium
**Tags:** Graphs, Shortest Path, Dijkstra'S, Shortest Path From Single Source, Network Analysis, Maximum Of Minimums, O((V+E), Interview

---

## Examples

### Example 1:
**Input:** `times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2`
**Output:** `2`
**Explanation:** Signal reaches all nodes: 2→1 (1), 2→3 (1), 3→4 (2).

### Example 2:
**Input:** `times = [[1,2,1]], n = 2, k = 2`
**Output:** `-1`
**Explanation:** Node 2 can't reach node 1.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 100 |
| Edges | 1 ≤ edges ≤ 6000 |
| Weight | 0 ≤ time ≤ 100 |
| Data Type | Directed weighted graph |
| Time Complexity | O((V+E) log V) with heap |
| Space Complexity | O(V + E) |
| Output Format | Time or -1 |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Cisco |
| 🔵 Amazon | 🟡 Uber | 🟢 Juniper |
| 🔵 Microsoft | 🟡 LinkedIn | 🟢 Arista |

---

## Follow-up Questions

1. Why is the answer max of all shortest paths?
2. What if we used BFS instead of Dijkstra?
3. How does this differ from all-pairs shortest path?
4. What about negative edge weights (Bellman-Ford)?
