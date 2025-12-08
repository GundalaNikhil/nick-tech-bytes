# Cycle Detection in Undirected Graph

## Problem Description

**Real-World Scenario:**
In a computer network, redundant connections can cause broadcast storms. Network admins need to detect loops (cycles) in the network topology. If a packet travels in a cycle forever, it crashes the network.

**Example Setup:** 
Rahul is designing a home IoT network. Some devices create mesh connections. He needs to ensure there are no loops that could cause infinite packet routing before the network stabilizes.

**What is Cycle Detection in Undirected Graph?**
A cycle exists if you can start at a vertex, travel along edges, and return to the same vertex without repeating an edge. In undirected graphs, we detect this using DFS by checking if we visit an already-visited node that's not the parent.

**Why is it important?**
- Network loop detection
- Deadlock detection
- Validating tree structures
- Detecting redundant connections

**Your Task:** 
Given an undirected graph, determine if it contains a cycle.

**Difficulty:** Medium
**Tags:** Graphs, Cycle Detection, Network Loop Detection, Deadlock Detection, Validating Tree Structures, Detecting Redundant Connections, O(V + E), Interview

---

## Examples

### Example 1:
**Input:** 
```
n = 4
edges = [[0,1], [1,2], [2,3], [3,0]]
```
**Output:** `true` (Cycle exists: 0→1→2→3→0)
**Explanation:** Starting from any node, we can return to it.

### Example 2:
**Input:** 
```
n = 4
edges = [[0,1], [1,2], [2,3]]
```
**Output:** `false`
**Explanation:** This is a simple path/chain - no cycles.

### Example 3:
**Input:** 
```
n = 5
edges = [[0,1], [0,2], [1,2], [3,4]]
```
**Output:** `true` (Cycle: 0→1→2→0)
**Explanation:** Even though graph is disconnected, one component has a cycle.

### Example 4:
**Input:** 
```
n = 3
edges = []
```
**Output:** `false`
**Explanation:** No edges, no cycles possible.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Vertices | 1 ≤ V ≤ 10⁵ |
| Edges | 0 ≤ E ≤ 2 × 10⁵ |
| Data Type | Integer node indices |
| Special Conditions | Undirected graph, may be disconnected |
| Time Complexity | O(V + E) |
| Space Complexity | O(V) |
| Output Format | Boolean (true if cycle exists) |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Cisco | 🟢 Juniper |
| 🔵 Amazon | 🟡 VMware | 🟢 Arista |
| 🔵 Microsoft | 🟡 Nutanix | 🟢 Palo Alto |

---

## Follow-up Questions

1. How do you avoid false positives from the parent edge?
2. How would you find the actual cycle path?
3. Can you use Union-Find for cycle detection? How?
4. What's the difference between cycle detection in directed vs undirected graphs?
