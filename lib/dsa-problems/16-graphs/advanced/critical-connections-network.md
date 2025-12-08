# Critical Connections in a Network

## Problem Description

**Real-World Scenario:**
A network engineer identifies "single points of failure" (bridges) in a server cluster topology. If any of these cables are cut, the network becomes disconnected.

**Example Setup:** 
A transportation planner finds critical roads that, if blocked, would split a city into isolated zones.

**What is Critical Connections...?**
There are `n` servers numbered from `0` to `n - 1` connected by undirected server-to-server `connections` forming a network where `connections[i] = [a, b]` represents a connection between servers `a` and `b`. Any server can reach any other server directly or indirectly through the network. A critical connection is a connection that, if removed, will make some servers unable to reach some other server. Return all critical connections in the network in any order.

**Why is it important?**
- Tarjan's Algorithm / DFS
- Bridges in Graph
- Low-Link Values
- Hard Graph Theory

**Your Task:** 
Return list of critical edges.

---

## Examples

### Example 1:
**Input:** `n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]`
**Output:** `[[1,3]]`
**Explanation:** [1,3] is the only bridge. Removing it disconnects 3 from {0,1,2}. Cycle 0-1-2-0 is robust.

### Example 2:
**Input:** `n = 2, connections = [[0,1]]`
**Output:** `[[0,1]]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Servers | 1 ≤ n ≤ 10⁵ |
| Connections | n-1 ≤ len ≤ 10⁵ |
| Data Type | Undirected Graph |
| Time Complexity | O(V + E) |
| Space Complexity | O(V + E) |
| Output Format | List of edges |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Cisco |
| 🔵 Google | 🟡 Microsoft | 🟢 Juniper |
| 🔵 Facebook | 🟡 Apple | 🟢 Arista |

---

## Follow-up Questions

1. What is a "bridge" in graph theory?
2. How do `discovery_time` and `low_link` values work?
3. Condition for bridge: `low[neighbor] > disc[node]`?
4. Why is this O(V+E) (single DFS pass)?
