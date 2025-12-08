# Number of Operations to Make Network Connected

## Problem Description

**Real-World Scenario:**
A datacenter technician needs to connect `n` isolated servers into a single network. They can unplug existing cables (edges) and plug them elsewhere. Find the minimum number of moves (unplug + plug) to connect all servers.

**Example Setup:** 
A power grid operator moves power lines from redundant loops to connect isolated substations.

**What is Number of Operations...?**
There are `n` computers numbered from `0` to `n - 1` connected by ethernet cables `connections` forming a network where `connections[i] = [a, b]` represents a connection between computers `a` and `b`. Any computer can reach any other computer directly or indirectly through the network. You are given an initial computer network `connections`. You can extract certain cables between two directly connected computers, and place them between any pair of disconnected computers to make them directly connected. Return the minimum number of times you need to do this in order to make all the computers connected. If it is not possible, return -1.

**Why is it important?**
- Union-Find (Count Components)
- Graph Connectivity
- MST concept (Edges needed = V - 1)
- Redundant edge counting

**Your Task:** 
Return minimum operations.

**Difficulty:** Medium
**Tags:** Graphs, Union Find, Union-Find, Graph Connectivity, Mst Concept, Redundant Edge Counting, O(V + E), Interview

---

## Examples

### Example 1:
**Input:** `n = 4, connections = [[0,1],[0,2],[1,2]]`
**Output:** `1`
**Explanation:** Remove cable [1,2], place between 1 and 3.

### Example 2:
**Input:** `n = 6, connections = [[0,1],[0,2],[0,3],[1,2],[1,3]]`
**Output:** `2`

### Example 3:
**Input:** `n = 6, connections = [[0,1],[0,2],[0,3],[1,2]]`
**Output:** `-1`
**Explanation:** Not enough cables. Need 5, have 4.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Computers | 1 ≤ n ≤ 10⁵ |
| Connections | 1 ≤ len ≤ 10⁵ |
| Data Type | Undirected Graph |
| Time Complexity | O(V + E) |
| Space Complexity | O(V) |
| Output Format | Integer operations |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Cisco |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Juniper |
| 🔵 Facebook | 🟡 Apple | 🟢 Arista |

---

## Follow-up Questions

1. Why check if `edges < n - 1` first?
2. How does Union-Find count connected components?
3. Why is the answer `components - 1`?
4. Can you use DFS/BFS to count components?
