# Critical Connections in Network

## Problem Description

**Real-World Scenario:**
A network administrator identifies critical cables - removing any would disconnect parts of the network. These are "bridges" in graph theory.

**Example Setup:** 
An airline identifies routes where failure would strand passengers. These critical routes need backup options.

**What is Critical Connections?**
Find all critical connections (bridges) in a network. An edge is critical if removing it disconnects the graph.

**Why is it important?**
- Network reliability
- Infrastructure planning
- Tarjan's algorithm
- Bridge detection

**Your Task:** 
Return all critical connections.

**Difficulty:** Hard
**Tags:** Graphs, Advanced, Network Reliability, Infrastructure Planning, Tarjan'S, Bridge Detection, O(V + E), Interview

---

## Examples

### Example 1:
**Input:** `n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]`
**Output:** `[[1,3]]`
**Explanation:** Removing [1,3] disconnects node 3 from the rest.

### Example 2:
**Input:** `n = 2, connections = [[0,1]]`
**Output:** `[[0,1]]`
**Explanation:** Only edge is critical.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 2 ≤ n ≤ 10⁵ |
| Edges | n - 1 ≤ connections ≤ 10⁵ |
| Data Type | Integer pairs |
| Special Conditions | Connected graph |
| Time Complexity | O(V + E) |
| Space Complexity | O(V + E) |
| Output Format | List of edges |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Cloudflare |
| 🔵 Google | 🟡 Uber | 🟢 Akamai |
| 🔵 Microsoft | 🟡 LinkedIn | 🟢 Fastly |

---

## Follow-up Questions

1. What's Tarjan's bridge-finding algorithm?
2. How do discovery time and low link values work?
3. What's the difference between bridges and articulation points?
4. How would you find strongly connected components?
